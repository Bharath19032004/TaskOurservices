"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, Calendar, CheckCircle, AlertCircle, Phone, MapPin } from "lucide-react";

const ServiceHoursList = ({ open, onOpenChange, diagnosticCenterData = {} }) => {
  // Service hours data - can be fetched from DB when available
  const serviceHours = [
    {
      id: 1,
      serviceName: "Diagnostic Services",
      type: "24/7 Service",
      days: "All Days",
      hours: "24 Hours",
      status: "Available",
      description: "Round-the-clock diagnostic testing and emergency services",
      icon: <Clock className="w-5 h-5" />,
      color: "green",
    },
    {
      id: 2,
      serviceName: "Sample Collection Center",
      type: "Regular Hours",
      days: "Monday - Saturday",
      hours: "8:00 AM - 8:00 PM",
      status: "Available",
      description: "Walk-in sample collection and home collection booking",
      icon: <Calendar className="w-5 h-5" />,
      color: "blue",
    },
    {
      id: 3,
      serviceName: "Report Collection",
      type: "Extended Hours",
      days: "Monday - Saturday",
      hours: "7:00 AM - 9:00 PM",
      status: "Available",
      description: "Physical report collection and digital report download",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "purple",
    },
    {
      id: 4,
      serviceName: "Home Sample Collection",
      type: "Scheduled Service",
      days: "All Days",
      hours: "6:00 AM - 10:00 PM",
      status: "Available",
      description: "Book home collection with advance scheduling",
      icon: <MapPin className="w-5 h-5" />,
      color: "orange",
    },
    {
      id: 5,
      serviceName: "Customer Support",
      type: "24/7 Support",
      days: "All Days",
      hours: "24 Hours",
      status: "Available",
      description: "Phone and online support for queries and bookings",
      icon: <Phone className="w-5 h-5" />,
      color: "cyan",
    },
    {
      id: 6,
      serviceName: "Online Consultation",
      type: "Scheduled Service",
      days: "Monday - Saturday",
      hours: "9:00 AM - 6:00 PM",
      status: diagnosticCenterData?.hspInfo?.onlineconsultation === "yes" ? "Available" : "Not Available",
      description: "Online consultation with specialists for test reports",
      icon: <AlertCircle className="w-5 h-5" />,
      color: "indigo",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: {
        bg: "from-green-50 to-green-100",
        border: "border-green-200",
        icon: "bg-green-100 text-green-600",
        badge: "bg-green-100 text-green-800 border-green-300",
      },
      blue: {
        bg: "from-blue-50 to-blue-100",
        border: "border-blue-200",
        icon: "bg-blue-100 text-blue-600",
        badge: "bg-blue-100 text-blue-800 border-blue-300",
      },
      purple: {
        bg: "from-purple-50 to-purple-100",
        border: "border-purple-200",
        icon: "bg-purple-100 text-purple-600",
        badge: "bg-purple-100 text-purple-800 border-purple-300",
      },
      orange: {
        bg: "from-orange-50 to-orange-100",
        border: "border-orange-200",
        icon: "bg-orange-100 text-orange-600",
        badge: "bg-orange-100 text-orange-800 border-orange-300",
      },
      cyan: {
        bg: "from-cyan-50 to-cyan-100",
        border: "border-cyan-200",
        icon: "bg-cyan-100 text-cyan-600",
        badge: "bg-cyan-100 text-cyan-800 border-cyan-300",
      },
      indigo: {
        bg: "from-indigo-50 to-indigo-100",
        border: "border-indigo-200",
        icon: "bg-indigo-100 text-indigo-600",
        badge: "bg-indigo-100 text-indigo-800 border-indigo-300",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-gradient-to-r from-orange-50 to-amber-50">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-orange-600" />
            Service Hours
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Operating hours for all our diagnostic services
          </DialogDescription>
        </DialogHeader>

        {/* Service Hours List - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
          <div className="space-y-4">
            {/* Center Contact Info Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Need Assistance?</h3>
                  <p className="text-blue-100 text-sm">We're available 24/7 to help you</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 bg-white/10 rounded-lg p-2">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">
                  {diagnosticCenterData?.hspcontact?.receptioncontact1 || 
                   diagnosticCenterData?.mobile || 
                   "Contact for more details"}
                </span>
              </div>
            </div>

            {/* Service Hours Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {serviceHours.map((service) => {
                const colorClasses = getColorClasses(service.color);
                const isAvailable = service.status === "Available";

                return (
                  <Card
                    key={service.id}
                    className={`hover:shadow-lg transition-all duration-300 border ${colorClasses.border} bg-white overflow-hidden`}
                  >
                    <CardContent className="p-5">
                      {/* Service Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-2 rounded-lg ${colorClasses.icon}`}>
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-base mb-1 leading-tight">
                              {service.serviceName}
                            </h4>
                            <Badge className={`text-xs ${colorClasses.badge}`}>
                              {service.type}
                            </Badge>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            isAvailable
                              ? "bg-green-100 text-green-800 border-green-300"
                              : "bg-red-100 text-red-800 border-red-300"
                          } text-xs whitespace-nowrap ml-2`}
                        >
                          {service.status}
                        </Badge>
                      </div>

                      {/* Service Details */}
                      <div className={`bg-gradient-to-br ${colorClasses.bg} rounded-lg p-4 border ${colorClasses.border} space-y-2`}>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <div>
                            <p className="text-xs text-gray-600 font-medium">Days</p>
                            <p className="text-sm font-bold text-gray-900">{service.days}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <div>
                            <p className="text-xs text-gray-600 font-medium">Hours</p>
                            <p className="text-sm font-bold text-gray-900">{service.hours}</p>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
              <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Important Information
              </h4>
              <ul className="text-sm text-blue-800 space-y-1 ml-7">
                <li>• Emergency diagnostic services are available 24/7</li>
                <li>• Home collection requires advance booking (minimum 2 hours notice)</li>
                <li>• Certain specialized tests may have specific collection timings</li>
                <li>• Fasting tests are recommended to be done in the morning</li>
                <li>• Online reports are available within 24-48 hours of sample collection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            For urgent queries or to book a service, please contact us directly at{" "}
            <span className="font-semibold text-blue-600">
              {diagnosticCenterData?.hspcontact?.receptioncontact1 || 
               diagnosticCenterData?.mobile || 
               "our contact number"}
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceHoursList;

