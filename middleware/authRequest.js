import jwt from "jsonwebtoken";

export const authRequest = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: "Authorization token required!" });

  const token = authorization.split(" ")[1];
  try {
    jwt.verify(token, process.env.SECRET);

    next();
  } catch (error) {
    res.status(400).json({ error: "Request unauthorized!" });
  }
};
