import { toast } from 'sonner';

// Show error toast
export const ErrorMessage = (msg: string) => {
  toast.error(msg, {
    duration: 3000,  
    position:'top-right',
    richColors: true,
    closeButton: true
  });
};

// Show success toast
export const SuccessMessage = (msg: string) => {
  toast.success(msg, {
    duration: 3000,
    position:'top-right',
    richColors: true,
    closeButton: true
  });
};
