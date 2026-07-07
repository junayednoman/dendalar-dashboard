import { toast } from "sonner";

type MutationResult = {
  success?: boolean;
  message?: string;
};

type MutationError = {
  status?: string | number;
  data?: {
    message?: string;
  };
};

const handleMutation = async <TData, TResult extends MutationResult = MutationResult>(
  data: TData,
  mutationFunc: (data: TData) => {
    unwrap: () => Promise<TResult>;
  },
  loadingTxt: string,
  onSuccess?: ((result: TResult) => void) | unknown,
  onFailure?: ((error: MutationError | MutationResult) => void) | unknown,
) => {
  const toastId = toast.loading(loadingTxt);

  try {
    const res = await mutationFunc(data).unwrap(); // Await the mutation

    if (res?.success) {
      toast.success(res?.message || "Operation successful", {
        id: toastId,
        duration: 1800,
      });
      if (typeof onSuccess === "function") {
        onSuccess(res);
      }
    } else {
      toast.error(res?.message || "Operation failed", {
        id: toastId,
        duration: 4500,
      });
      if (typeof onFailure === "function") {
        onFailure(res);
      }
    }
  } catch (error: unknown) {
    const parsedError = error as MutationError;
    let errorMessage = "Something went wrong!";
    if (parsedError.status === "PARSING_ERROR") {
      errorMessage =
        "Server returned invalid data. Please try again or contact support.";
    } else if (parsedError.data?.message) {
      errorMessage = parsedError.data.message;
    }

    toast.error(errorMessage, {
      id: toastId,
      duration: 4500,
    });
    if (typeof onFailure === "function") {
      onFailure(parsedError);
    }
  }
};

export default handleMutation;
