"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Stethoscope, Info, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PathologyList = ({ isOpen, onClose, pathologyData, centerName }) => {
  // Unified Theme
  const unified = {
    headerGradient: "from-[#1E3B90] to-[#3D85EF]",
    cardHeaderGradient: "from-[#1E3B90]/10 to-[#3D85EF]/10",
    accentText: "text-[#1E3B90]",
    buttonGradient: "from-[#1E3B90] to-[#3D85EF]",
    lightBg: "bg-[#EEF3FF]",
    borderColor: "border-[#E1E8FF]",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto p-0 bg-white border-none shadow-2xl rounded-2xl">
        {/* Header */}
        <DialogHeader className={`sticky top-0 z-10 bg-gradient-to-r ${unified.headerGradient} text-white p-5 rounded-t-2xl shadow-md`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="text-xl sm:text-2xl font-bold text-white">
                  Pathology Services
                </DialogTitle>
                <p className="text-white/90 text-sm mt-1">
                  Available at <span className="font-semibold">{centerName}</span>
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 bg-white">
          {pathologyData && pathologyData.trim() !== "" && pathologyData !== "null" ? (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Info */}
              <Card className={`border ${unified.borderColor} shadow-md hover:shadow-lg transition-shadow rounded-xl`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2 ${unified.lightBg} rounded-lg`}>
                      <FileText className={`w-5 h-5 ${unified.accentText}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Pathology Lab Information
                      </h3>
                      <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {pathologyData}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Highlight Card */}
              <Card className={`bg-gradient-to-br from-[#EEF3FF] to-[#E1E8FF] border ${unified.borderColor} shadow-md hover:shadow-lg transition-shadow rounded-xl`}>
                <CardContent className="p-6 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Info className={`w-5 h-5 ${unified.accentText}`} /> Important Note
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      For specific pathology tests and requirements, please contact
                      the diagnostic center directly for accurate information and availability.
                    </p>
                  </div>

                  <div className={`mt-6 border-t ${unified.borderColor} pt-4`}>
                    <p className={`text-sm italic ${unified.accentText}`}>
                      "Accurate reports begin with reliable testing facilities."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Empty State
            <Card className="border border-gray-200 shadow-md rounded-2xl">
              <CardContent className="p-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Stethoscope className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Data Not Found
                </h3>
                <p className="text-gray-600 max-w-md">
                  Pathology information is not currently available for this diagnostic center.
                  Please contact the center directly for details.
                </p>
                <div className={`mt-6 p-4 ${unified.lightBg} rounded-lg ${unified.borderColor} border max-w-lg`}>
                  <div className="flex items-start gap-2">
                    <Info className={`w-5 h-5 ${unified.accentText} flex-shrink-0 mt-0.5`} />
                    <p className="text-sm text-gray-800">
                      You can reach out to the center's reception for more information
                      about available pathology services and tests.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PathologyList;