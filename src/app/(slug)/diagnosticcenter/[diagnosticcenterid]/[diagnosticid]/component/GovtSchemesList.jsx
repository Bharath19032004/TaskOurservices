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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl max-h-[85vh] overflow-y-auto p-0 rounded-2xl shadow-2xl border-none"
        hideCloseButton
      >
        {/* Header */}
        <DialogHeader className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-5 sm:p-6 rounded-t-2xl shadow-md">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/25 rounded-xl backdrop-blur-sm shadow-inner">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-white tracking-wide">
                  Government Schemes
                </DialogTitle>
                <p className="text-purple-100 text-sm mt-1">
                  Available healthcare schemes at{" "}
                  <span className="font-semibold">{centerName}</span>
                </p>
              </div>
            </div>

            {/* Right side close button */}
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
            <Card className="border border-purple-100 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden bg-white">
              <div className="h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <FileText className="w-6 h-6 text-purple-600" />
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

                {/* Info Section */}
                <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 hover:bg-blue-100/60 transition-all">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Info className="w-5 h-5 text-blue-700" />
                  </div>
                  <div className="text-sm text-blue-800 leading-relaxed">
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
            // Empty State
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

                  <div className="mt-6 p-5 bg-amber-50 rounded-xl border border-amber-200 max-w-lg text-left">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      </div>
                      <p className="text-sm text-amber-800 leading-relaxed">
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
