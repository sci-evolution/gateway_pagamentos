"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InfoIcon as InfoCircle } from "lucide-react"
import { loginWithApiKey, type ActionResponse } from "./actions"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Estado inicial do formulário
const initialState: ActionResponse = {
  success: true,
  message: ""
}

// Wrapper para adaptar a função de servidor ao useActionState
const formAction = async (prevState: ActionResponse, formData: FormData): Promise<ActionResponse> => {
  return loginWithApiKey(formData)
}

export function AuthForm() {
  const [state, dispatch] = useActionState(formAction, initialState)

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Autenticação Gateway</CardTitle>
        <CardDescription>Insira sua API Key para acessar o sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-4">
          {!state.success && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              API Key
            </label>
            <div className="flex gap-2">
              <Input id="apiKey" name="apiKey" placeholder="Digite sua API Key" className="flex-1" />
              <SubmitButton />
            </div>
          </div>
          <div className="rounded-lg bg-muted p-4">
            <div className="flex gap-2">
              <InfoCircle className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">Como obter uma API Key?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Para obter sua API Key, você precisa criar uma conta de comerciante. Entre em contato com nosso
                  suporte para mais informações.
                </p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

// Componente para o botão de envio com estado de carregamento
function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button type="submit" className="px-4" disabled={pending}>
      {pending ? (
        <span className="sr-only">Carregando...</span>
      ) : (
        <span className="sr-only">Entrar</span>
      )}
      →
    </Button>
  )
} 