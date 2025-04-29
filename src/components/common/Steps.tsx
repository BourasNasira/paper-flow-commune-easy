
import { cn } from "@/lib/utils";

interface StepsProps {
  currentStep: number;
  steps: string[];
}

const Steps = ({ currentStep, steps }: StepsProps) => {
  return (
    <div className="w-full py-4">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;

          return (
            <li 
              key={index}
              className={cn(
                "flex items-center",
                index !== steps.length - 1 ? "w-full" : "",
              )}
            >
              <div className="flex items-center justify-center">
                <span
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                    isActive && "bg-blue-600 text-white",
                    isCompleted && "bg-green-500 text-white",
                    !isActive && !isCompleted && "bg-gray-200 text-gray-600"
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
              </div>
              
              <div className={cn("ml-2 text-sm", index !== steps.length - 1 ? "flex-grow" : "")}>
                <h3
                  className={cn(
                    "font-medium",
                    isActive && "text-blue-600",
                    isCompleted && "text-green-500",
                    !isActive && !isCompleted && "text-gray-600"
                  )}
                >
                  {step}
                </h3>
              </div>
              
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "flex-grow border-t mx-2",
                    isCompleted ? "border-green-500" : "border-gray-200"
                  )}
                ></div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Steps;
