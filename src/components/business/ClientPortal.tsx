import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Calendar, MessageSquare, Download, Upload, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Disclaimer from '@/components/legal/Disclaimer';

interface Case {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'completed' | 'on-hold';
  lastUpdate: string;
  documents: Document[];
  nextAppointment?: string;
  description: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  uploadedBy: 'client' | 'lawyer';
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  service: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

interface Message {
  id: string;
  from: 'client' | 'lawyer';
  content: string;
  timestamp: string;
  read: boolean;
}

export default function ClientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Datos de ejemplo
  const cases: Case[] = [
    {
      id: '1',
      title: 'Caso Laboral - Despido Injustificado',
      status: 'active',
      lastUpdate: '2024-01-15',
      description: 'Proceso por despido injustificado. Se presentó demanda ante el Tribunal del Trabajo.',
      documents: [
        { id: '1', name: 'Contrato de Trabajo.pdf', type: 'PDF', uploadDate: '2024-01-10', size: '2.3 MB', uploadedBy: 'lawyer' },
        { id: '2', name: 'Carta de Despido.pdf', type: 'PDF', uploadDate: '2024-01-12', size: '1.1 MB', uploadedBy: 'client' },
        { id: '3', name: 'Demanda Laboral.pdf', type: 'PDF', uploadDate: '2024-01-15', size: '3.2 MB', uploadedBy: 'lawyer' }
      ],
      nextAppointment: '2024-01-25'
    },
    {
      id: '2',
      title: 'Divorcio de Mutuo Acuerdo',
      status: 'completed',
      lastUpdate: '2024-01-05',
      description: 'Proceso de divorcio de mutuo acuerdo completado exitosamente.',
      documents: [
        { id: '4', name: 'Acuerdo de Divorcio.pdf', type: 'PDF', uploadDate: '2024-01-05', size: '1.8 MB', uploadedBy: 'lawyer' }
      ]
    }
  ];

  const appointments: Appointment[] = [
    {
      id: '1',
      date: '2024-01-25',
      time: '10:00',
      service: 'Consulta de Seguimiento',
      status: 'confirmed',
      notes: 'Revisión del estado del caso laboral'
    },
    {
      id: '2',
      date: '2024-02-01',
      time: '14:30',
      service: 'Audiencia',
      status: 'scheduled',
      notes: 'Audiencia en Tribunal del Trabajo'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      from: 'lawyer',
      content: 'Hola, he revisado los documentos que enviaste. Todo está en orden para proceder con la demanda.',
      timestamp: '2024-01-15T10:30:00Z',
      read: true
    },
    {
      id: '2',
      from: 'client',
      content: 'Gracias por la información. ¿Cuándo será la próxima audiencia?',
      timestamp: '2024-01-15T11:15:00Z',
      read: true
    },
    {
      id: '3',
      from: 'lawyer',
      content: 'La audiencia está programada para el 1 de febrero a las 14:30. Te enviaré más detalles por email.',
      timestamp: '2024-01-15T11:45:00Z',
      read: false
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simular autenticación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (clientId && password) {
        setIsAuthenticated(true);
      } else {
        setError('Por favor completa todos los campos');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'pending': return 'Pendiente';
      case 'completed': return 'Completado';
      case 'on-hold': return 'En Espera';
      case 'scheduled': return 'Programada';
      case 'confirmed': return 'Confirmada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Portal de Clientes</CardTitle>
          <p className="text-center text-gray-600 text-sm">
            Accede a tu información de casos y documentos
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="form-label">ID de Cliente</label>
              <Input
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Ingresa tu ID de cliente"
                required
              />
            </div>
            <div>
              <label className="form-label">Contraseña</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Acceder'}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes acceso?{' '}
              <a href="/contacto" className="text-primary-600 hover:underline">
                Contáctanos
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Portal de Clientes</h1>
        <p className="text-gray-600">Gestiona tus casos y documentos de forma segura</p>
      </div>

      <Tabs defaultValue="cases" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cases">Mis Casos</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="messages">Mensajes</TabsTrigger>
          <TabsTrigger value="appointments">Citas</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-4">
          {cases.map((caseItem) => (
            <Card key={caseItem.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{caseItem.title}</CardTitle>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(caseItem.status)}`}>
                    {getStatusText(caseItem.status)}
                  </span>
                </div>
                <p className="text-gray-600">{caseItem.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    Última actualización: {new Date(caseItem.lastUpdate).toLocaleDateString('es-ES')}
                  </div>
                  
                  {caseItem.nextAppointment && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Próxima cita: {new Date(caseItem.nextAppointment).toLocaleDateString('es-ES')}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Documentos ({caseItem.documents.length})
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Enviar Mensaje
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Compartidos</CardTitle>
              <p className="text-gray-600">Todos los documentos relacionados con tus casos</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cases.flatMap(caseItem => 
                  caseItem.documents.map(doc => ({ ...doc, caseTitle: caseItem.title }))
                ).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-sm text-gray-600">
                          {doc.caseTitle} • {doc.type} • {doc.size} • {new Date(doc.uploadDate).toLocaleDateString('es-ES')}
                        </p>
                        <p className="text-xs text-gray-500">
                          Subido por: {doc.uploadedBy === 'lawyer' ? 'Abogado' : 'Cliente'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mensajes</CardTitle>
              <p className="text-gray-600">Comunicación con tu abogado</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`p-4 rounded-lg ${
                    message.from === 'lawyer' ? 'bg-blue-50 border-l-4 border-blue-400' : 'bg-gray-50 border-l-4 border-gray-400'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm">
                        {message.from === 'lawyer' ? 'Dr. Juan Pérez' : 'Tú'}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleString('es-ES')}
                        </span>
                        {!message.read && message.from === 'lawyer' && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700">{message.content}</p>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex space-x-2">
                    <Input placeholder="Escribe tu mensaje..." className="flex-1" />
                    <Button>Enviar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Citas</CardTitle>
              <p className="text-gray-600">Citas programadas y confirmadas</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(appointment.date).toLocaleDateString('es-ES')} a las {appointment.time}
                        </p>
                        <p className="text-sm text-gray-600">{appointment.service}</p>
                        {appointment.notes && (
                          <p className="text-xs text-gray-500">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusText(appointment.status)}
                      </span>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Disclaimer */}
      <div className="mt-8">
        <Disclaimer type="general" />
      </div>
    </div>
  );
}
