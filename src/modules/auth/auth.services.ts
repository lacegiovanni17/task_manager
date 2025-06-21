import User from "../users/user.model";
import { IUser } from "../users/user.interface";
import { BadRequestsException } from "../../utils/exceptions/bad_request.exception";
import { NotFoundException } from "../../utils/exceptions/not_found.exception";
import UtilService from "../../utils/services/utils.service";
import { ILoginUserResponse } from "./auth.interface";
import { IGenericResponseModel } from "../../utils/interfaces/generic_response.interface";
import { UserRoles, UserStatus } from "../users/user.enum";
import { Types } from "mongoose";

class AuthService {
  private utilService = new UtilService();

  public async registerUser(userData: Partial<IUser>) {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return this.utilService.buildApiErrorResponse({
          data: null,
          message: "User already exists with this email",
          statusCode: 400,
        });
      }

      userData.password = this.utilService.hashPassword(userData.password!);
      userData.user_role = userData.user_role || UserRoles.USER;
      userData.user_status = UserStatus.INACTIVE;

      const newUser = new User(userData);
      await newUser.save();

      return this.utilService.buildApiResponse({
        data: newUser,
        message: "User registered successfully",
        statusCode: 201,
        success: true,
      });
    } catch (error: any) {
      console.error("Error during user registration:", error);
      throw error;
    }
  }

  public async loginUser(
    email: string,
    password: string
  ): Promise<IGenericResponseModel<ILoginUserResponse>> {
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        throw new NotFoundException("Invalid email or password");
      }

      const isPasswordValid = this.utilService.comparePassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        throw new BadRequestsException("Invalid email or password");
      }

      user.user_status = UserStatus.ACTIVE;
      await user.save();

      const { token, expiresIn } = this.utilService.generateToken(
        new Types.ObjectId(user._id),
        user.email,
        user.user_role
      );

      return this.utilService.buildApiResponse<ILoginUserResponse>({
        data: { token, expiresIn, user },
        message: "Login successful",
        statusCode: 200,
        success: true,
      });
    } catch (error: any) {
      console.error("Error during user login:", error);
      throw error;
    }
  }
}

export const authService = new AuthService();
