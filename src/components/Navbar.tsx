import { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Phone, Mail } from 'lucide-react';
import logo from '../assets/images/logo.png';

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre Nosotros', href: '#sobre-nosotros' },
  { name: 'Nuestros Servicios Legales', href: '#servicios' },
  { name: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm transition-colors">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <img 
                src={logo.src} 
                alt="MGM Abogados" 
                className="h-10 w-auto"
              />
              <span className="font-bold text-xl text-foreground">
                MGM Abogados
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a href="tel:+56323428987" className="hover:text-primary-600 transition-colors">
                +56 32 3428987
              </a>
            </div>
            <Button asChild className="btn-primary">
              <a href="#contacto" aria-label="Ir a formulario de contacto para consulta legal">
                Consulta Legal
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 bg-primary-600 rounded-md flex items-center justify-center">
                        <span className="text-white font-bold text-lg">J</span>
                      </div>
                      <span className="font-bold text-xl text-foreground">
                        MGM Abogados
                      </span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 py-6">
                    <div className="space-y-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block text-lg font-medium text-foreground hover:text-primary-600 transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile Contact Info */}
                  <div className="border-t py-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm">
                        <Phone className="h-4 w-4 text-primary-600" />
                        <a 
                          href="tel:+56323428987" 
                          className="text-foreground hover:text-primary-600 transition-colors"
                        >
                          +56 32 3428987
                        </a>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <Mail className="h-4 w-4 text-primary-600" />
                        <a 
                          href="mailto:contacto@mgm-abogados.cl" 
                          className="text-foreground hover:text-primary-600 transition-colors"
                        >
                          contacto@mgm-abogados.cl
                        </a>
                      </div>
                    </div>
                    
                    <Button asChild className="w-full btn-primary">
                      <a href="#contacto" onClick={() => setIsOpen(false)} aria-label="Ir a formulario de contacto para consulta legal">
                        Consulta Legal
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
