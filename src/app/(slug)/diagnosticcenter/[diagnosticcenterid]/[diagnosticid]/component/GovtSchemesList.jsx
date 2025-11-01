"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Info, FileText, AlertCircle, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const GovtSchemesList = ({ isOpen, onClose, govtSchemesData, centerName }) => {
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
      <DialogContent
        className="max-w-4xl max-h-[85vh] overflow-y-auto p-0 rounded-2xl shadow-2xl border-none"
        hideCloseButton
      >
        {/* Header */}
        <DialogHeader className={`sticky top-0 z-10 bg-gradient-to-r ${unified.headerGradient} text-white p-5 sm:p-6 rounded-t-2xl shadow-md`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/25 rounded-xl backdrop-blur-sm shadow-inner">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-white tracking-wide">
                  Government Schemes
                </DialogTitle>
                <p className="text-white/90 text-sm mt-1">
                  Available healthcare schemes at{" "}
                  <span className="font-semibold">{centerName}</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 transition-all p-2 rounded-lg backdrop-blur-sm focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Main Content */}
        <div className="p-6 sm:p-8 bg-white">
          {govtSchemesData && govtSchemesData.trim() !== "" ? (
            <Card className={`border ${unified.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden bg-white`}>
              <div className={`h-2 bg-gradient-to-r ${unified.buttonGradient}`} />
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 ${unified.lightBg} rounded-xl`}>
                    <FileText className={`w-6 h-6 ${unified.accentText}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Schemes Information
                    </h3>
                    <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {govtSchemesData}
                    </div>
                  </div>
                </div>

                <div className={`mt-8 p-5 ${unified.lightBg} ${unified.borderColor} border rounded-xl flex items-start gap-3 hover:opacity-90 transition-all`}>
                  <div className={`p-2 ${unified.lightBg} rounded-lg`}>
                    <Info className={`w-5 h-5 ${unified.accentText}`} />
                  </div>
                  <div className="text-sm text-gray-800 leading-relaxed">
                    <p className="font-semibold mb-1">Important Note:</p>
                    <p>
                      Please verify the scheme eligibility criteria and required
                      documents with the diagnostic center administration before
                      availing benefits.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-gray-200 shadow-lg rounded-2xl bg-white text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-10 sm:p-14">
                <div className="flex flex-col items-center justify-center space-y-5">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    No Data Available
                  </h3>
                  <p className="text-gray-600 max-w-md leading-relaxed">
                    Government schemes information is not currently available for
                    this diagnostic center. Please contact the center directly
                    for more details.
                  </p>

                  <div className={`mt-6 p-5 ${unified.lightBg} rounded-xl ${unified.borderColor} border max-w-lg text-left`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 ${unified.lightBg} rounded-lg`}>
                        <AlertCircle className={`w-5 h-5 ${unified.accentText}`} />
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        You can reach out to the center reception for information
                        about available government healthcare schemes or upcoming
                        updates.
                      </p>
                    </div>
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

export default GovtSchemesList;