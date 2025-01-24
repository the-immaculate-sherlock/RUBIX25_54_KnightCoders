import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Circle } from 'lucide-react';

export default function ApplicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    income: '',
    occupation: '',
    currentAddress: '',
    moveInDate: '',
    references: '',
  });

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Employment & Income' },
    { number: 3, title: 'References' },
    { number: 4, title: 'Review & Submit' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent default link behavior
    alert('Application submitted successfully!');
    navigate('/'); // Redirect to the home page
  };

  return (
    <div className="bg-slate-800 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-neutral-200">Rental Application</h1>
  
        <div className="mt-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div className="flex items-center">
                  {currentStep > step.number ? (
                    <CheckCircle className="w-8 h-8 text-neutral-200" />
                  ) : currentStep === step.number ? (
                    <div className="w-8 h-8 rounded-full bg-neutral-200 text-slate-800 flex items-center justify-center">
                      {step.number}
                    </div>
                  ) : (
                    <Circle className="w-8 h-8 text-gray-300" />
                  )}
                  {step.number < steps.length && (
                    <div
                      className={`w-24 h-1 ${
                        currentStep > step.number ? 'bg-neutral-200' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
                <span className="mt-2 text-sm text-gray-300">{step.title}</span>
              </div>
            ))}
          </div>
  
          <div className="mt-8 bg-neutral-200 p-6 rounded-lg shadow-md">
            {/* Step Content */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Employment & Income */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Annual Income</label>
                  <input
                    type="number"
                    name="income"
                    value={formData.income}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
  
            {/* References */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Address</label>
                  <input
                    type="text"
                    name="currentAddress"
                    value={formData.currentAddress}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Desired Move-in Date</label>
                  <input
                    type="date"
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">References</label>
                  <textarea
                    name="references"
                    value={formData.references}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Please provide contact information for your references"
                  />
                </div>
              </div>
            )}
  
            {/* Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Review Your Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="text-sm text-gray-900">{formData.firstName} {formData.lastName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="text-sm text-gray-900">{formData.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd className="text-sm text-gray-900">{formData.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                      <dd className="text-sm text-gray-900">{formData.occupation}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Annual Income</dt>
                      <dd className="text-sm text-gray-900">${formData.income}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Move-in Date</dt>
                      <dd className="text-sm text-gray-900">{formData.moveInDate}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
  
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="bg-slate-800 text-neutral-200 px-4 py-2 rounded-md border border-neutral-200 hover:bg-neutral-300 hover:text-slate-800"
                >
                  Back
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="bg-slate-800 text-neutral-200 px-4 py-2 rounded-md hover:bg-neutral-300 hover:text-slate-800 ml-auto"
                >
                  Next
                </button>
              ) : (
                <Link
                  to="/"
                  onClick={handleSubmit}
                  className="bg-slate-800 text-neutral-200 px-4 py-2 rounded-md hover:bg-neutral-300 hover:text-slate-800 ml-auto"
                >
                  Submit Application
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}