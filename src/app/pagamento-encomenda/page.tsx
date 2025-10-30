'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  CreditCard, 
  Package, 
  Truck, 
  Shield, 
  Phone, 
  Mail, 
  MapPin,
  Calculator,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

export default function PagamentoEncomendaPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    documento: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    produto: '',
    quantidade: '',
    especificacoes: '',
    prazo: '',
    observacoes: '',
    formaPagamento: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
    }, 2000)
  }

  const paymentMethods = [
    { id: 'boleto', name: 'Boleto Bancário', icon: '📄', description: 'Pagamento em até 3 dias' },
    { id: 'pix', name: 'PIX', icon: '📱', description: 'Pagamento instantâneo' },
    { id: 'transferencia', name: 'Transferência', icon: '🏦', description: 'Transferência bancária' },
    { id: 'cartao', name: 'Cartão de Crédito', icon: '💳', description: 'Parcelado em até 12x' }
  ]

  const productCategories = [
    'Pneus para Carros',
    'Pneus para Caminhões',
    'Pneus para Camionetas',
    'Pneus para Máquinas Agrícolas',
    'Pneus para Ônibus',
    'Pneus Industriais',
    'Pneus de Aro Especial',
    'Outros'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ML</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Mercado Livre dos Pneus</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Início
              </Link>
              <Link href="#produtos" className="text-gray-600 hover:text-blue-600 transition-colors">
                Produtos
              </Link>
              <Link href="#contato" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contato
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Pagamento de Encomenda Especial
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Solicite pneus especiais, quantidades grandes ou produtos personalizados com condições exclusivas
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Benefits Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Produtos Especiais</h3>
                <p className="text-sm text-gray-600">Pneus importados e modelos exclusivos</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Calculator className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Preços Especiais</h3>
                <p className="text-sm text-gray-600">Condições exclusivas para grandes quantidades</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Truck className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Entrega Rápida</h3>
                <p className="text-sm text-gray-600">Logística especializada para seu pedido</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Garantia Total</h3>
                <p className="text-sm text-gray-600">Segurança e garantia em todas as transações</p>
              </CardContent>
            </Card>
          </div>

          {/* Form Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Formulário de Encomenda
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {submitStatus === 'success' ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Encomenda Recebida!</h3>
                      <p className="text-gray-600 mb-6">
                        Sua encomenda especial foi recebida com sucesso. Entraremos em contato em até 24 horas para confirmar os detalhes.
                      </p>
                      <Link href="/">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Voltar para a Loja
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Dados Pessoais</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="nome">Nome Completo *</Label>
                            <Input
                              id="nome"
                              value={formData.nome}
                              onChange={(e) => handleInputChange('nome', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">E-mail *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="telefone">Telefone *</Label>
                            <Input
                              id="telefone"
                              value={formData.telefone}
                              onChange={(e) => handleInputChange('telefone', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="empresa">Empresa (opcional)</Label>
                            <Input
                              id="empresa"
                              value={formData.empresa}
                              onChange={(e) => handleInputChange('empresa', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Endereço</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Label htmlFor="endereco">Endereço Completo *</Label>
                            <Input
                              id="endereco"
                              value={formData.endereco}
                              onChange={(e) => handleInputChange('endereco', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cidade">Cidade *</Label>
                            <Input
                              id="cidade"
                              value={formData.cidade}
                              onChange={(e) => handleInputChange('cidade', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="estado">Estado *</Label>
                            <Input
                              id="estado"
                              value={formData.estado}
                              onChange={(e) => handleInputChange('estado', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cep">CEP *</Label>
                            <Input
                              id="cep"
                              value={formData.cep}
                              onChange={(e) => handleInputChange('cep', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="documento">CPF/CNPJ *</Label>
                            <Input
                              id="documento"
                              value={formData.documento}
                              onChange={(e) => handleInputChange('documento', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">Detalhes da Encomenda</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="produto">Tipo de Produto *</Label>
                            <Select value={formData.produto} onValueChange={(value) => handleInputChange('produto', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o produto" />
                              </SelectTrigger>
                              <SelectContent>
                                {productCategories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="quantidade">Quantidade *</Label>
                            <Input
                              id="quantidade"
                              type="number"
                              value={formData.quantidade}
                              onChange={(e) => handleInputChange('quantidade', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="prazo">Prazo Desejado</Label>
                            <Select value={formData.prazo} onValueChange={(value) => handleInputChange('prazo', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o prazo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="urgente">Urgente (até 7 dias)</SelectItem>
                                <SelectItem value="normal">Normal (15-30 dias)</SelectItem>
                                <SelectItem value="flexivel">Flexível (acima de 30 dias)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="formaPagamento">Forma de Pagamento *</Label>
                            <Select value={formData.formaPagamento} onValueChange={(value) => handleInputChange('formaPagamento', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a forma" />
                              </SelectTrigger>
                              <SelectContent>
                                {paymentMethods.map((method) => (
                                  <SelectItem key={method.id} value={method.id}>
                                    {method.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="especificacoes">Especificações Técnicas</Label>
                          <Textarea
                            id="especificacoes"
                            placeholder="Descreva as especificações técnicas do produto desejado (medidas, modelo, marca, etc.)"
                            value={formData.especificacoes}
                            onChange={(e) => handleInputChange('especificacoes', e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="observacoes">Observações Adicionais</Label>
                          <Textarea
                            id="observacoes"
                            placeholder="Informações adicionais sobre a encomenda"
                            value={formData.observacoes}
                            onChange={(e) => handleInputChange('observacoes', e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar Encomenda'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Formas de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Contato Rápido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Telefone</p>
                      <p className="text-gray-600">(49) 3436-1447</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-gray-600">encomendas@scpneus.com.br</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Endereço</p>
                      <p className="text-gray-600">Rua Luiz Bagatini, 581</p>
                      <p className="text-gray-600">Xanxerê - SC</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Informações Importantes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      <Clock className="w-3 h-3 mr-1" />
                      24h
                    </Badge>
                    <p className="text-sm">Retorno em até 24 horas úteis</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Confirmado
                    </Badge>
                    <p className="text-sm">Orçamento confirmado antes do envio</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      <Shield className="w-3 h-3 mr-1" />
                      Seguro
                    </Badge>
                    <p className="text-sm">Transação 100% segura</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}