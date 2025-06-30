'use client';

import { useState, useTransition } from 'react';
import { getCreditAnalysis } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Terminal, Bot } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { CreditworthinessOutput } from '@/ai/flows/creditworthiness-analysis';

export function CreditScoreTool() {
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{
    data: CreditworthinessOutput | null;
    message: string;
  } | null>(null);

  const { toast } = useToast();

  const handleAnalysis = () => {
    startTransition(async () => {
      const result = await getCreditAnalysis();
      setState(result);
      if (result.message && result.message !== 'success') {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message,
        });
      }
    });
  };

  const pending = isPending;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="flex flex-col items-center justify-center p-6 text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Bot className="size-8" />
          </div>
          <CardTitle>Automated Credit Analysis</CardTitle>
          <CardDescription>
            Click the button to analyze your existing financial data and get a
            credit score instantly. The AI will use your transaction history to
            provide a score based on OJK regulations.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <Button onClick={handleAnalysis} disabled={pending} className="w-full">
            {pending ? 'Analyzing...' : 'Analyze My Financials'}
          </Button>
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
        ) : state?.data ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Your Credit Score</CardTitle>
                <CardDescription>Based on your financial data.</CardDescription>
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
