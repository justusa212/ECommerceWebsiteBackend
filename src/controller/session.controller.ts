import { CookieOptions, Request, Response } from "express";
import config from "config";
import {createSession, findSessions,updateSession,} from "../service/session.service";
import {findAndUpdateUser,getGoogleOAuthTokens,getGoogleUser,validatePassword,} from "../service/user.service";
import { signJwt } from "../../utils/jwt.utils";

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1 year
};

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
  );

  res.cookie("accessToken", accessToken, accessTokenCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

export async function googleOauthHandler(req: Request, res: Response) {
  const code = req.query.code as string;

  try {
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    const googleUser = await getGoogleUser({id_token, access_token})

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }

    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      { 
        email: googleUser.email,
        name: googleUser.name,
      },
       {
        upsert: true,
        new: true,
      }
    );

    const session = await createSession(user!._id, req.get("user-agent") || "");

    const accessToken = signJwt(
      { ...user!.toJSON(), session: session._id },
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );

    const refreshToken = signJwt(
      { ...user!.toJSON(), session: session._id },
      { expiresIn: config.get("refreshTokenTtl") } // 1 year
    );

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    res.redirect(config.get("origin"));
  } catch (error) {
      console.log(error, "Failed to authorize Google user");
      return res.redirect(`${config.get("origin")}/oauth/error`);
  }
}