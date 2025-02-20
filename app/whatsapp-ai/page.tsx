"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Calendar, MessageSquare, Users, ArrowRight, Github, Linkedin, Mail, Phone, Apple as WhatsApp, CheckCircle2, ArrowDownToLine, Sparkles } from "lucide-react";
import { useEffect } from "react";

export default function WhatsAppAI() {
  const WHATSAPP_URL = "https://wa.me/558496697348";

  const features = [
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: "Atendimento via WhatsApp",
      description: "Suporte automatizado 24/7 com respostas inteligentes e personalizadas"
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Integração com Google Calendar",
      description: "Agendamentos automáticos sincronizados com sua agenda"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "CRM Autônomo",
      description: "Gestão inteligente de clientes e leads sem intervenção manual"
    },
    {
      icon: <Brain className="w-12 h-12 brain-icon" />,
      title: "Mensagens Segmentadas",
      description: "Envio automático de mensagens para públicos específicos"
    }
  ];

  const benefits = [
    {
      title: "Aumente suas Vendas",
      description: "Capture e converta leads 24/7 com atendimento instantâneo",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
    },
    {
      title: "Reduza Custos",
      description: "Automatize o atendimento e reduza custos operacionais",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
    },
    {
      title: "Escale seu Negócio",
      description: "Atenda milhares de clientes simultaneamente sem perder qualidade",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80"
    }
  ];

  const testimonials = [
    {
      name: "Ana Silva",
      role: "CEO, TechStart",
      content: "A IA da RACDEV transformou completamente nosso atendimento. Aumentamos nossas conversões em 150%.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      name: "Carlos Santos",
      role: "Diretor Comercial, InoveMax",
      content: "Impressionante como a IA entende e responde às necessidades dos clientes. Nosso NPS subiu para 92.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
    }
  ];

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    document.querySelectorAll('.reveal').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <header className="fixed w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold gradient-text logo">RACDEV</div>
          </div>
        </div>
      </header>

      <section className="min-h-screen relative flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-[0.15]"
            poster="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80"
          >
            <source src="https://player.vimeo.com/external/477721941.hd.mp4?s=1cd53d11d245b2639ad8e6641f1c8ce7f0db2feb&profile_id=175" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl reveal">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground mb-6">
              <Sparkles className="w-4 h-4" /> Tecnologia de Ponta
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Revolucione seu Atendimento com WhatsApp AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transforme seu WhatsApp em um assistente virtual inteligente que atende, vende e fideliza 24 horas por dia.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => window.open(WHATSAPP_URL, '_blank')}
              >
                Começar Agora <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-foreground hover:bg-primary/10"
                onClick={() => window.open(WHATSAPP_URL, '_blank')}
              >
                Ver Demonstração <ArrowDownToLine className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Transforme seu Negócio
            </h2>
            <p className="text-xl text-muted-foreground">
              Descubra como nossa IA pode revolucionar sua empresa
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden bg-background border-primary/20 hover-card reveal delay-${index * 200}`}
              >
                <div className="h-48 relative">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Recursos Avançados
            </h2>
            <p className="text-xl text-muted-foreground">
              Tudo que você precisa para um atendimento excepcional
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`p-6 bg-card border-primary/20 hover:bg-primary/10 transition-colors duration-300 hover-card reveal delay-${index * 200}`}
              >
                <div className="text-foreground mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              O que Dizem Nossos Clientes
            </h2>
            <p className="text-xl text-muted-foreground">
              Histórias reais de sucesso com nossa solução
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 bg-background border-primary/20 reveal">
                <div className="flex items-start gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Pronto para Revolucionar seu Atendimento?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a centenas de empresas que já transformaram seu atendimento com nossa IA
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => window.open(WHATSAPP_URL, '_blank')}
              >
                Começar Agora <ArrowRight className="ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-primary text-foreground hover:bg-primary/10"
                onClick={() => window.open(WHATSAPP_URL, '_blank')}
              >
                Falar com Especialista <WhatsApp className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="w-5 h-5 text-[#60a5fa]" />
                <span>Setup em 24h</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="w-5 h-5 text-[#60a5fa]" />
                <span>Suporte 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="w-5 h-5 text-[#60a5fa]" />
                <span>ROI Garantido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-card border-t border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6 mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground hover:text-primary"
              onClick={() => window.open(WHATSAPP_URL, '_blank')}
            >
              <WhatsApp className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <Linkedin className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <Mail className="w-6 h-6" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <Phone className="w-6 h-6" />
            </Button>
          </div>
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 RACDEV. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}