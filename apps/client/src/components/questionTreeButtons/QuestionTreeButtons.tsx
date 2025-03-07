import React from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { getQuestions, getQuestionsError, getQuestionsIsLoading } from "@/providers/store/selectors/questions";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axiosApi from '@/api/api';
import { setError, setLoading } from "@/providers/store/slices/questionsSlice";
import { useAppDispatch } from "@/hooks/use-dispatch";
import { setInterview } from "@/providers/store/slices/interviewSlice";

export const QuestionTreeButtons = () => {
  const allQuestions = useSelector(getQuestions);
  const error = useSelector(getQuestionsError);
  const loading = useSelector(getQuestionsIsLoading);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleNextStep = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const questionIds = allQuestions.map((item) => item.id);

    try {
      const response = await axiosApi.post('/interview/create', { 
        questions: questionIds,
        candidateId: '90c83dbc-2e86-40d5-8300-3b052da132fb',
        interviewerId: 'b8966f1c-edfe-493b-8274-218bdcc55380',
        timeDuration: '60'
      });
      dispatch(setInterview(response.data));
      router.push("/interview/interview");
    } catch (err: unknown) {
      dispatch(setError('Failed to create interview')); 
    } finally {
      dispatch(setLoading(false)); 
    }
  };

  const handleBackStep = () => {
    router.push("/interview/start");
  };

  return (
    <>
    {error && <p className="text-red-600">{error}</p>}
    <div className="flex justify-around py-6">
      <Button
        variant="destructive"
        title="Back"
        className="cursor-pointer"
        onClick={handleBackStep}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Back</span>
      </Button>
      <Button
        variant="destructive"
        className="cursor-pointer"
        title="Next"
        onClick={handleNextStep}
        disabled={loading || allQuestions.length === 0 }
      >
        <span>Next</span>
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
    </>
    
  );
};
