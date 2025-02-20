"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, MessageSquare, ArrowRight, Github, Linkedin, Mail, Phone, Menu, X, Send, Zap, Blocks, Code, ExternalLink } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

interface Message {
  text: string;
  type: "ai" | "user";
  timestamp: number;
}

export default function Home() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial AI message
    setMessages([
      { 
        text: "Olá! Sou a IA da RACDEV. Como posso ajudar você hoje?", 
        type: "ai",
        timestamp: Date.now()
      }
    ]);

    // Add scroll reveal animation
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

  const whyChooseCards = [
    {
      title: "IA que Escala",
      description: "Processe milhões de interações simultâneas com a mesma velocidade. Cresça sem limites.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80",
      alt: "Rede neural digital representando escalabilidade",
      icon: <Zap className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
    },
    {
      title: "Integração Instantânea",
      description: "Conecte-se a qualquer sistema em minutos. Automatize tudo com um clique.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80",
      alt: "Conexões digitais representando integração",
      icon: <Blocks className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
    },
    {
      title: "Solução Única",
      description: "Software personalizado para seu negócio. Resultados desde o primeiro dia.",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80",
      alt: "Código em tela representando desenvolvimento",
      icon: <Code className="w-8 h-8 text-primary group-hover:translate-x-2 transition-transform duration-300" />
    }
  ];

  // Auto-scroll chat container when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && !isLoading) {
      setIsLoading(true);
      
      try {
        // Add user message to the chat
        const userMessage: Message = { 
          text: newMessage, 
          type: "user",
          timestamp: Date.now()
        };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setNewMessage("");

        // Prepare the conversation context
        const conversationContext = updatedMessages.map(msg => ({
          content: msg.text,
          role: msg.type === 'ai' ? 'assistant' : 'user',
          timestamp: msg.timestamp
        }));

        // Send message to webhook
        const response = await fetch('https://n8n-n8n.pxriso.easypanel.host/webhook/receive-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            myField: newMessage,
            message: newMessage,
            context: conversationContext,
            timestamp: Date.now()
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Extract the message from myField property
        const aiResponseText = data.myField;
        
        if (!aiResponseText) {
          throw new Error('Resposta inválida do servidor');
        }

        // Add AI response to chat
        const aiMessage: Message = {
          text: aiResponseText,
          type: "ai",
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        
        // Add error message to chat
        const errorMessage: Message = {
          text: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde.",
          type: "ai",
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
        // Focus back on input after sending message
        inputRef.current?.focus();
      }
    }
  };

  const menuItems = [
    { id: "ai-product", label: "Produto IA" },
    { id: "chat", label: "Chat IA" },
    { id: "about", label: "Sobre" },
    { id: "why-choose", label: "Por que RACDEV?" },
    { id: "contact", label: "Contato" },
  ];

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold gradient-text logo">RACDEV</div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left px-2 py-1"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="section min-h-screen flex items-center relative overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl reveal">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Desenvolvimento de Software com Inteligência Artificial
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Automação, eficiência e inovação para transformar seu negócio.
            </p>
            <Button 
              size="lg" 
              onClick={() => router.push('/whatsapp-ai')}
              className="hover-card"
            >
              Explorar Solução <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* AI Product Section */}
      <section id="ai-product" className="section bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Conheça nossa IA Inteligente para Empresas
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Automação avançada e integração total com seu negócio.
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => router.push('/whatsapp-ai')}
                className="hover-card"
              >
                Conhecer <ArrowRight className="ml-2" />
              </Button>
            </div>
            <div className="flex justify-center reveal delay-200">
              <Brain className="w-48 h-48 brain-icon" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Chat Section */}
      <section id="chat" className="section">
        <div className="container">
          <h2 className="text-3xl text-center font-bold mb-12 reveal">
            Converse com nossa IA
          </h2>
          <Card className="max-w-2xl mx-auto p-6">
            <div 
              ref={chatContainerRef}
              className="space-y-4 mb-4 max-h-[400px] overflow-y-auto chat-messages scroll-smooth"
            >
              {messages.map((message, index) => (
                <div key={index} className={`chat-message ${message.type}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* About the Founder */}
      <section id="about" className="section bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <img
                src="https://github.com/admracdev/lp-racdev-main/tree/main/app/assets/IMG_5842.heic"
                alt="Founder"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="reveal delay-200">
              <h2 className="text-3xl font-bold mb-6">
                Quem está por trás da Raccoon Development?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Especialista em desenvolvimento de software e inteligência artificial, 
                dedicado a criar soluções inovadoras que impulsionam o sucesso dos 
                nossos clientes.
              </p>
              <Button 
                variant="outline"
                onClick={() => window.open('https://brunoraniere.com', '_blank')}
                className="group hover:bg-primary/10 border-primary/50"
              >
                Conheça Bruno Raniere
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose RACDEV */}
      <section id="why-choose" className="section">
        <div className="container">
          <h2 className="text-3xl text-center font-bold mb-12 reveal">
            Por que escolher a RACDEV?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {whyChooseCards.map((card, index) => (
              <Card 
                key={index} 
                className={`group relative overflow-hidden hover-card reveal delay-${index * 200} cursor-pointer`}
              >
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-[0.7] group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/90 group-hover:from-background/70 group-hover:to-background/95 transition-colors duration-300"></div>
                </div>
                <div className="relative z-10 p-8">
                  <div className="mb-6 transform group-hover:-translate-y-1 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {card.description}
                  </p>
                  <div className="h-1 w-12 bg-primary/50 mt-6 group-hover:w-24 transition-all duration-300"></div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center reveal">
            <Button
              size="lg"
              onClick={() => router.push('/whatsapp-ai')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground group"
            >
              Conheça Nossa Solução
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className="section bg-card">
        <div className="container">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl font-bold mb-6">
              Entre em contato e leve IA para o seu negócio
            </h2>
            <div className="flex justify-center space-x-6">
              <Button variant="ghost" size="icon">
                <Github className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <Phone className="w-6 h-6" />
              </Button>
            </div>
          </div>
          <div className="text-center text-muted-foreground reveal delay-200">
            <p>&copy; 2025 RACDEV. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}