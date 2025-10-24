import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Heart, PartyPopper } from "lucide-react";
import barbieLogo from "@/assets/barbie-logo.png";
import barbieDress from "@/assets/barbie-dress.png";
import barbieDog from "@/assets/barbie-dog.png";

const formSchema = z.object({
  nome: z.string().min(3, "Por favor, insira o nome completo").max(100, "Nome muito longo"),
  criancas: z.number().min(0, "Número inválido").max(50, "Número muito alto"),
  adultos: z.number().min(0, "Número inválido").max(50, "Número muito alto"),
});

type FormData = z.infer<typeof formSchema>;

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
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

  const onSubmit = async (data: FormData) => {
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
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative Images */}
      <img
        src={barbieDress}
        alt=""
        className="absolute top-20 left-4 w-32 md:w-48 opacity-30 float pointer-events-none hidden md:block"
      />
      <img
        src={barbieDog}
        alt=""
        className="absolute bottom-20 right-4 w-32 md:w-48 opacity-30 float pointer-events-none hidden md:block"
        style={{ animationDelay: "1s" }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="flex justify-center mb-6">
            <img src={barbieLogo} alt="Barbie" className="w-32 md:w-40 sparkle" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold text-primary flex items-center justify-center gap-3 flex-wrap">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
              Aniversário da Emanuelly
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

        {/* Form Card */}
        <div className="max-w-2xl mx-auto">
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          {/* Footer Message */}
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
      </div>
    </div>
  );
};

export default Index;
