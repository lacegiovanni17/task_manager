import User from "./user.model";
import { IUser } from "./user.interface";
import { Types } from "mongoose";
import UtilService from "../../utils/services/utils.service";
import { NotFoundException } from "../../utils/exceptions/not_found.exception";
import { BadRequestsException } from "../../utils/exceptions/bad_request.exception";
import { IGenericResponseModel } from "../../utils/interfaces/generic_response.interface";

class UserService {
  private utilService = new UtilService();

  // Get User Profile
  public async getUserProfile(
    userId: string
  ): Promise<IGenericResponseModel<IUser>> {
    try {
      if (!Types.ObjectId.isValid(userId)) {
        throw new BadRequestsException("Invalid User ID format");
      }

      const user = await User.findById(userId).lean();
      if (!user) {
        throw new NotFoundException("User not found");
      }

      return this.utilService.buildApiResponse({
        data: user,
        message: "User profile retrieved successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error: any) {
      console.error("Error getting user profile:", error);
      throw error;
    }
  }

  // Find User by Email
  public async findUserByEmail(
    email: string
  ): Promise<IGenericResponseModel<IUser | null>> {
    try {
      const user = await User.findOne({ email }).lean();
      return this.utilService.buildApiResponse({
        data: user,
        message: user ? "User found" : "No user found with this email",
        statusCode: user ? 200 : 404,
        success: !!user,
      });
    } catch (error: any) {
      throw new NotFoundException("Error finding user by email");
    }
  }

  // Update User Profile
  public async updateUserProfile(
    userId: string,
    updateData: Partial<IUser>
  ): Promise<IGenericResponseModel<IUser | null>> {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      }).lean();
      if (!updatedUser) {
        throw new NotFoundException("User not found");
      }

      return this.utilService.buildApiResponse({
        data: updatedUser,
        message: "User profile updated successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error: any) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  // 📊 Total Users Count
  public async totalUsersCount(): Promise<IGenericResponseModel<number>> {
    try {
      const count = await User.countDocuments();

      return this.utilService.buildApiResponse({
        data: count,
        message: "Total number of users retrieved successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error counting users:", error);
      throw error;
    }
  }

  // Optional: Admin - Get All Users
  public async getAllUsers(): Promise<IGenericResponseModel<IUser[]>> {
    try {
      const users = await User.find().lean();
      return this.utilService.buildApiResponse({
        data: users,
        message: "All users retrieved successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error: any) {
      console.error("Error getting all users:", error);
      throw error;
    }
  }
}

export const userService = new UserService();
