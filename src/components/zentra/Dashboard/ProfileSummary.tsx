import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  User,
  Edit,
  Upload,
  Award,
  Calendar,
  MessageSquare,
} from "lucide-react";

interface ProfileSummaryProps {
  expanded?: boolean;
}

export function ProfileSummary({ expanded = false }: ProfileSummaryProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Simulate file upload with progress
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsUploading(false);

            // Read and set the image
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target?.result) {
                setProfileImage(e.target.result as string);
              }
            };
            reader.readAsDataURL(file);

            return 100;
          }
          return newProgress;
        });
      }, 300);
    }
  };

  return (
    <div className={expanded ? "p-2" : ""}>
      <h2 className="text-lg font-semibold text-white mb-4">Profile Summary</h2>

      <div className="flex flex-col items-center">
        {/* Profile picture with animated ring */}
        <div className="relative group">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff]"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ padding: 3 }}
          ></motion.div>

          <div className="relative h-24 w-24 rounded-full bg-[#161a2b] border-2 border-[#4fc3f7]/50 overflow-hidden flex items-center justify-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-[#4fc3f7]/50" />
            )}

            {/* Upload overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <label
                htmlFor="profile-image"
                className="cursor-pointer bg-[#4fc3f7] hover:bg-[#4fc3f7]/80 transition-colors rounded-full p-2"
              >
                <Upload className="h-5 w-5 text-white" />
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Upload progress indicator */}
          {isUploading && (
            <div className="absolute -bottom-1 left-0 w-full">
              <div className="bg-[#161a2b] h-1 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#4fc3f7] to-[#8a7fff] h-full rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <h3 className="mt-4 text-xl font-semibold text-white">Alex Johnson</h3>
        <div className="flex items-center gap-1 mt-1">
          <Award className="h-4 w-4 text-[#4fc3f7]" />
          <span className="text-[#e0e6ff]/70 text-sm">Zentra Plus</span>
        </div>

        {/* Quick stats */}
        <div className="w-full mt-6 grid grid-cols-2 gap-4">
          <div className="bg-[#161a2b] rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="h-4 w-4 text-[#e0e6ff]/50" />
              <span className="text-[#e0e6ff]/70 text-xs">Member Since</span>
            </div>
            <p className="text-[#e0e6ff] font-medium">Jan 2023</p>
          </div>

          <div className="bg-[#161a2b] rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MessageSquare className="h-4 w-4 text-[#e0e6ff]/50" />
              <span className="text-[#e0e6ff]/70 text-xs">AI Interactions</span>
            </div>
            <p className="text-[#e0e6ff] font-medium">1,248</p>
          </div>
        </div>

        {/* Edit Profile button */}
        <motion.div
          className="w-full mt-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button className="w-full bg-[#161a2b] border border-[#8a7fff]/20 text-[#e0e6ff] hover:bg-[#161a2b]/80 hover:border-[#4fc3f7]/30 group transition-colors">
            <Edit className="h-4 w-4 mr-2 group-hover:text-[#4fc3f7] transition-colors" />
            Edit Profile
          </Button>
        </motion.div>

        {/* Additional information when expanded */}
        {expanded && (
          <div className="w-full mt-6 space-y-4">
            <div className="bg-[#161a2b] rounded-lg p-4">
              <h4 className="text-[#e0e6ff] font-medium mb-2">
                Profile Information
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#e0e6ff]/70">Email</span>
                  <span className="text-[#e0e6ff]">alex@example.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#e0e6ff]/70">Location</span>
                  <span className="text-[#e0e6ff]">San Francisco, CA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#e0e6ff]/70">Timezone</span>
                  <span className="text-[#e0e6ff]">Pacific (GMT-7)</span>
                </div>
              </div>
            </div>

            <div className="bg-[#161a2b] rounded-lg p-4">
              <h4 className="text-[#e0e6ff] font-medium mb-2">
                Activity Stats
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0f111a] rounded-lg p-3">
                  <p className="text-[#e0e6ff]/70 text-xs mb-1">AI Queries</p>
                  <p className="text-[#e0e6ff] font-medium">528</p>
                </div>
                <div className="bg-[#0f111a] rounded-lg p-3">
                  <p className="text-[#e0e6ff]/70 text-xs mb-1">Saved Items</p>
                  <p className="text-[#e0e6ff] font-medium">47</p>
                </div>
                <div className="bg-[#0f111a] rounded-lg p-3">
                  <p className="text-[#e0e6ff]/70 text-xs mb-1">Last Login</p>
                  <p className="text-[#e0e6ff] font-medium">Today</p>
                </div>
                <div className="bg-[#0f111a] rounded-lg p-3">
                  <p className="text-[#e0e6ff]/70 text-xs mb-1">Sessions</p>
                  <p className="text-[#e0e6ff] font-medium">23</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
