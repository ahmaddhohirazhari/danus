'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { getCreditAnalysis } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Terminal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const initialState = {
  data: null,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Analyzing...' : 'Analyze Creditworthiness'}
    </Button>
  );
}

export function CreditScoreTool() {
  const [state, formAction] = useActionState(getCreditAnalysis, initialState);
  const { toast } = useToast();
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Creditworthiness Analysis</CardTitle>
          <CardDescription>
            Enter your UMKM's financial data to get a credit score based on OJK rules.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Textarea
              name="financialData"
              placeholder="Paste your transaction history, profit/loss statements, or describe your financial situation here..."
              className="min-h-[300px]"
              required
            />
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {pending ? (
          <>
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-3/5" />
                <Skeleton className="h-4 w-4/5" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-12 w-1/2 mx-auto" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-2/5" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </>
        ) : state.data ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Your Credit Score</CardTitle>
                <CardDescription>Based on the provided financial data.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <div className="text-6xl font-bold text-primary">{state.data.creditScore}
                  <span className="text-2xl text-muted-foreground">/ 100</span>
                </div>
                <Progress value={state.data.creditScore} className="h-3"/>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{state.data.analysis}</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="flex h-full min-h-[440px] items-center justify-center border-dashed">
             <div className="text-center text-muted-foreground p-8">
              <Terminal className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-xl font-semibold">Awaiting Analysis</h3>
              <p>Your credit score and analysis will appear here.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
