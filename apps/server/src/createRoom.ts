import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import express from "express";
import { Router,Request,Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyJWT } from "./verify";
dotenv.config();


