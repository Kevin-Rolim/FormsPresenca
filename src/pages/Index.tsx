import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Heart, PartyPopper } from "lucide-react";

// ================================================ //
// ========= 💖 IMPORTS CORRIGIDOS ========= //
// ================================================ //
import barbieLogo from "../assets/barbie-logo.png";
import fotoManu from "../assets/fotoManu.jpg";
import barbieSilhouette from "../assets/barbie-silhouette.jpg"; // <-- 💖 SILHUETA DE VOLTA

const formSchema = z.object({
  nome: z.string().min(3, "Por favor, insira o nome completo").max(100, "Nome muito longo"),
  criancas: z.number().min(0, "Número inválido").max(50, "Número muito alto"),
  adultos: z.number().min(0, "Número inválido").max(50, "Número muito alto"),
});

type FormData = z.infer<typeof formSchema>;

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const submitted = localStorage.getItem("barbie-party-submitted");
    if (submitted) {
      setHasSubmitted(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      criancas: 0,
      adultos: 0,
    },
  });

  const handleFormSubmit = (data: FormData) => {
    if (hasSubmitted) {
      setShowDuplicateDialog(true);
      return;
    }
    submitForm(data);
  };

  const submitForm = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://hook.us2.make.com/5b26dte1v3ftnftqyilfw1s1sn36ras9", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: data.nome,
          criancas: data.criancas,
          adultos: data.adultos,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        localStorage.setItem("barbie-party-submitted", "true");
        setHasSubmitted(true);
        toast({
          title: "Presença confirmada! 🎉",
          description: "Obrigada por confirmar! Mal podemos esperar para te ver na festa!",
        });
        reset();
      } else {
        throw new Error("Erro ao enviar confirmação");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Ops! Algo deu errado 😢",
        description: "Não conseguimos confirmar sua presença. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setShowDuplicateDialog(false);
    }
  };

  const handleConfirmResubmit = () => {
    const formData = {
      nome: document.getElementById("nome") as HTMLInputElement,
      criancas: document.getElementById("criancas") as HTMLInputElement,
      adultos: document.getElementById("adultos") as HTMLInputElement,
    };

    const data = {
      nome: formData.nome.value,
      criancas: parseInt(formData.criancas.value) || 0,
      adultos: parseInt(formData.adultos.value) || 0,
    };

    submitForm(data);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {/* ================================================ */}
      {/* ========= ✨ DECORAÇÃO DE SPARKLES (20) ========= */}
      {/* ================================================ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
        <div className="sparkle-bg"></div>
      </div>

      {/* ================================================ */}
      {/* ========= 🎀 SILHUETA DE VOLTA (COM .JPG) ========= */}
      {/* ================================================ */}
      <img
        src={barbieSilhouette}
        alt="Silhueta Barbie"
        className="absolute bottom-0 left-0 w-32 md:w-48 pointer-events-none z-10 
                   mix-blend-multiply opacity-40" // <-- 💖 TRUQUE PARA O .JPG
      />

      {/* ================================================ */}
      {/* ========= 💖 "RESPIRO" ADICIONADO AQUI (px-6) ========= */}
      {/* ================================================ */}
      <div className="container mx-auto px-6 py-8 md:py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="flex justify-center mb-6">
            <img src={barbieLogo} alt="Barbie" className="w-32 md:w-40 sparkle" />
          </div>

          <div className="space-y-3">
            <h1 className="font-script text-5xl md:text-7xl font-bold text-primary flex items-center justify-center gap-3 flex-wrap">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
              Aniversário da Emanuelle
              <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-semibold flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 fill-current" />
              Tema Barbie
              <Heart className="w-6 h-6 fill-current" />
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Você está convidado para uma festa incrível! Por favor, confirme sua presença preenchendo o formulário abaixo.
            </p>
          </div>
        </div>

        {/* ================================================================== */}
        {/* ========= INÍCIO DA SEÇÃO (IMAGEM + FORM) ========= */}
        {/* ================================================================== */}
        <div className="max-w-2xl mx-auto">
          
          {/* 1. Imagem da Aniversariante */}
          <div className="mb-8">
            <img
              src={fotoManu}
              alt="Aniversariante Emanuelle com bolo da Barbie"
              className="rounded-xl shadow-[var(--shadow-soft)] w-full h-auto object-cover"
            />
          </div>

          {/* 2. Card do Formulário */}
          <Card className="shadow-[var(--shadow-soft)] border-2 border-primary/20">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl text-primary flex items-center justify-center gap-2">
                <PartyPopper className="w-7 h-7" />
                Confirme sua Presença
              </CardTitle>
              <CardDescription className="text-base">
                Queremos muito que você faça parte deste dia especial!
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                {/* Nome Completo */}
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-base font-semibold text-foreground">
                    Nome Completo *
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Digite seu nome completo"
                    {...register("nome")}
                    className="h-12 text-base border-2 focus-visible:border-primary"
                  />
                  {errors.nome && (
                    <p className="text-sm text-destructive">{errors.nome.message}</p>
                  )}
                </div>

                {/* Número de Crianças e Adultos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Crianças */}
                  <div className="space-y-2">
                    <Label htmlFor="criancas" className="text-base font-semibold text-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Crianças
                    </Label>
                    <div className="relative">
                      <Input
                        id="criancas"
                        type="number"
                        min="0"
                        placeholder="0"
                        {...register("criancas", { valueAsNumber: true })}
                        className="h-14 text-base border-2 focus-visible:border-primary pl-4 pr-4 text-center text-lg font-semibold"
                      />
                    </div>
                    {errors.criancas && (
                      <p className="text-sm text-destructive">{errors.criancas.message}</p>
                    )}
                  </div>

                  {/* Adultos */}
                  <div className="space-y-2">
                    <Label htmlFor="adultos" className="text-base font-semibold text-foreground flex items-center gap-2">
                      <Heart className="w-4 h-4 text-secondary" />
                      Adultos
                    </Label>
                    <div className="relative">
                      <Input
                        id="adultos"
                        type="number"
                        min="0"
                        placeholder="0"
                        {...register("adultos", { valueAsNumber: true })}
                        className="h-14 text-base border-2 focus-visible:border-primary pl-4 pr-4 text-center text-lg font-semibold"
                      />
                    </div>
                    {errors.adultos && (
                      <p className="text-sm text-destructive">{errors.adultos.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-bold shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-soft)] transition-all"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <PartyPopper className="w-5 h-5 mr-2" />
                      Confirmar Presença
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* 3. Footer Message */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-lg text-secondary font-semibold flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 fill-current" />
              Mal podemos esperar para te ver lá!
              <Heart className="w-5 h-5 fill-current" />
            </p>
            <p className="text-muted-foreground">
              Qualquer dúvida, entre em contato com a família
            </p>
          </div>
        </div>
        {/* ================================================================ */}
        {/* ========= FIM DA SEÇÃO (IMAGEM + FORM) ========= */}
        {/* ================================================================ */}

      </div>

      {/* Duplicate Submission Dialog */}
      <AlertDialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-primary">
              <Heart className="w-5 h-5" />
              Formulário já respondido
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Você já confirmou sua presença anteriormente. Se enviar novamente, a resposta anterior será ignorada e apenas a nova será considerada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmResubmit} className="bg-primary hover:bg-primary/90">
              Confirmar mesmo assim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;