import { useState } from 'react';
import { Calendar, Clock, Users, Upload, Check, ArrowRight, Palette, Brush, GraduationCap, Sparkles, Star, Eye, Award, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { services, workshops, featuredArtists } from '../../data/mockData';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useApp } from '../../context/AppContext';

interface ServicesPageProps {
  onNavigate?: (page: string, id?: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { addToCart } = useApp();
  const [activeTab, setActiveTab] = useState('commissions');
  const [commissionFormOpen, setCommissionFormOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artworkType: '',
    description: '',
    budget: '',
    timeline: '',
  });

  const handleSubmitCommission = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Commission request submitted! We\'ll get back to you within 24 hours.');
    setCommissionFormOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      artworkType: '',
      description: '',
      budget: '',
      timeline: '',
    });
  };

  const handleBookWorkshop = (workshop: any) => {
    addToCart({
      id: workshop.id,
      title: workshop.title,
      price: workshop.price,
      image: workshop.image
    });
    toast.success(`Workshop "${workshop.title}" added to cart!`);
  };

  const handleViewPortfolio = (artistId: string) => {
    const artist = featuredArtists.find(a => a.id === artistId);
    setSelectedArtist(artist);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Enhanced with Visual Content */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#D4AF37]/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#8B4049]/10 rounded-full blur-3xl" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl mb-6 font-light tracking-tight text-gray-900 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Creative Services
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
                From custom commissions to expert workshops, we bring your artistic vision to life
              </p>

              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#8B4049] rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-light text-gray-900">200+</p>
                    <p className="text-sm text-gray-600">Expert Artists</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8B4049] to-[#D4AF37] rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-light text-gray-900">500+</p>
                    <p className="text-sm text-gray-600">Projects Done</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => {
                    setSelectedService(null);
                    setCommissionFormOpen(true);
                  }}
                  size="lg"
                  className="bg-gradient-to-r from-[#D4AF37] to-[#8B4049] hover:from-[#8B4049] hover:to-[#D4AF37] text-white px-8 py-6 text-base rounded-none font-medium tracking-wide shadow-lg"
                >
                  REQUEST COMMISSION
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setActiveTab('workshops');
                    const workshopsSection = document.getElementById('workshops-section');
                    workshopsSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-6 text-base rounded-none border-2 border-gray-300 hover:border-[#D4AF37] hover:bg-gray-50"
                >
                  BROWSE WORKSHOPS
                </Button>
              </div>
            </motion.div>

            {/* Right Visual Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1752649935124-ba7876ddc65c?w=600"
                      alt="Artist Workshop"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600"
                      alt="Custom Art"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1761395303113-43537427be67?w=600"
                      alt="Commission Work"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600"
                      alt="Creative Studio"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-2xl border border-gray-200">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="font-semibold text-gray-900">4.9</span>
                  <span className="text-gray-600">Average Rating</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview Stats */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Palette,
                title: 'Custom Commissions',
                desc: 'Bespoke artworks tailored to your vision',
                count: '500+',
                color: '#D4AF37'
              },
              {
                icon: Brush,
                title: 'Professional Artists',
                desc: 'Vetted and talented creators',
                count: '200+',
                color: '#8B4049'
              },
              {
                icon: GraduationCap,
                title: 'Art Workshops',
                desc: 'Learn from master artists',
                count: '50+',
                color: '#D4AF37'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                  <item.icon className="w-10 h-10" style={{ color: item.color }} />
                </div>
                <h3 className="text-2xl font-medium mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 font-light mb-3">{item.desc}</p>
                <p className="text-3xl font-light" style={{ color: item.color }}>{item.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-light mb-6 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                Meet Our Featured Artists
              </h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                Talented creators ready to bring your vision to life
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all h-full group bg-white">
                  <div className="aspect-square overflow-hidden bg-gray-100 relative">
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <Button
                        onClick={() => handleViewPortfolio(artist.id)}
                        size="sm"
                        className="bg-white text-gray-900 hover:bg-gray-100 rounded-full"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Portfolio
                      </Button>
                    </div>
                    {artist.verified && (
                      <Badge className="absolute top-4 right-4 bg-[#D4AF37] text-white border-0">
                        Verified
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-medium mb-2 text-gray-900">{artist.name}</h3>
                    <p className="text-sm text-gray-600 font-light mb-4">{artist.specialty}</p>

                    <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                      <div>
                        <p className="font-semibold text-gray-900">{artist.artworks}</p>
                        <p className="text-xs">Artworks</p>
                      </div>
                      <div className="h-8 w-px bg-gray-300" />
                      <div>
                        <p className="font-semibold text-gray-900">{artist.followers}</p>
                        <p className="text-xs">Followers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Portfolio Dialog */}
      <Dialog open={!!selectedArtist} onOpenChange={(open) => !open && setSelectedArtist(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedArtist && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={selectedArtist.avatar}
                    alt={selectedArtist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <DialogTitle className="text-2xl font-light">{selectedArtist.name}</DialogTitle>
                    <DialogDescription className="text-base">{selectedArtist.specialty}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{selectedArtist.bio}</p>
                </div>

                <div className="flex items-center gap-8 py-4 border-y">
                  <div>
                    <p className="text-2xl font-light text-[#D4AF37]">{selectedArtist.artworks}</p>
                    <p className="text-sm text-gray-600">Artworks Created</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-[#8B4049]">{selectedArtist.followers}</p>
                    <p className="text-sm text-gray-600">Followers</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                      <span className="text-2xl font-light">4.9</span>
                    </div>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Sample Works</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={`https://images.unsplash.com/photo-${1579783902614 + i * 100}-a3fb3927b6a5?w=400`}
                          alt={`Artwork ${i}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setSelectedArtist(null);
                    setCommissionFormOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#8B4049] hover:from-[#8B4049] hover:to-[#D4AF37] text-white py-6 text-base rounded-none font-medium"
                >
                  Request Commission from {selectedArtist.name}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Services & Workshops Tabs */}
      <section className="py-20 bg-white" id="workshops-section">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="text-center mb-12">
              <TabsList className="inline-flex bg-gray-100 p-1 rounded-none">
                <TabsTrigger value="commissions" className="px-8 py-3 text-base rounded-none data-[state=active]:bg-white">
                  Commission Services
                </TabsTrigger>
                <TabsTrigger value="workshops" className="px-8 py-3 text-base rounded-none data-[state=active]:bg-white">
                  Workshops & Classes
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Commissions Tab */}
            <TabsContent value="commissions">
              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all h-full group">
                      <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        <div className="absolute top-6 left-6">
                          <div className="text-5xl">{service.icon}</div>
                        </div>

                        <Badge className="absolute top-6 right-6 bg-white/95 text-gray-900 border-0">
                          {service.category}
                        </Badge>
                      </div>

                      <CardContent className="p-8">
                        <h3 className="text-2xl font-medium mb-3 text-gray-900">{service.title}</h3>
                        <p className="text-gray-600 font-light mb-6 leading-relaxed">{service.description}</p>

                        <div className="space-y-4 mb-8 pb-8 border-b">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 font-light">Starting from</span>
                            <span className="text-3xl font-light text-[#D4AF37]">
                              ₹{service.startingPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 font-light">Delivery time</span>
                            <span className="text-gray-900 font-medium flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {service.deliveryTime}
                            </span>
                          </div>
                        </div>

                        <Button
                          onClick={() => {
                            setSelectedService(service);
                            setCommissionFormOpen(true);
                          }}
                          className="w-full bg-[#8B4049] hover:bg-[#7A3840] text-white py-6 text-base rounded-none font-medium tracking-wide"
                        >
                          REQUEST COMMISSION
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Workshops Tab */}
            <TabsContent value="workshops">
              <div className="grid md:grid-cols-3 gap-8">
                {workshops.map((workshop, index) => (
                  <motion.div
                    key={workshop.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all h-full group">
                      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                        <img
                          src={workshop.image}
                          alt={workshop.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <Badge className="absolute top-4 right-4 bg-[#D4AF37] text-white border-0">
                          {workshop.level}
                        </Badge>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-medium mb-2 text-gray-900">{workshop.title}</h3>
                        <p className="text-sm text-gray-600 font-light mb-2">with {workshop.instructor}</p>
                        <p className="text-gray-600 font-light mb-6 line-clamp-2">{workshop.description}</p>

                        <div className="space-y-3 mb-6 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="font-light">{workshop.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="font-light">{workshop.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span className="font-light">{workshop.spots} spots available</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                          <span className="text-2xl font-light text-gray-900">
                            ₹{workshop.price.toLocaleString()}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <Button
                            onClick={() => onNavigate?.('workshop-detail', workshop.id)}
                            className="w-full bg-[#D4AF37] hover:bg-[#C19B2A] text-white rounded-none"
                          >
                            VIEW DETAILS
                          </Button>
                          <Button
                            onClick={() => handleBookWorkshop(workshop)}
                            variant="outline"
                            className="w-full rounded-none border-[#8B4049] text-[#8B4049] hover:bg-[#8B4049] hover:text-white"
                          >
                            QUICK BOOK
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-[#D4AF37]" />
            <h2 className="text-4xl lg:text-5xl font-light mb-6 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Have a Custom Project in Mind?
            </h2>
            <p className="text-lg text-gray-300 font-light mb-10 max-w-2xl mx-auto">
              Our team of expert artists is ready to collaborate with you on any creative project
            </p>
            <Dialog open={commissionFormOpen} onOpenChange={setCommissionFormOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setSelectedService(null)}
                  size="lg"
                  className="bg-gradient-to-r from-[#D4AF37] to-[#C19B2A] hover:from-[#C19B2A] hover:to-[#D4AF37] text-white px-12 py-7 text-lg rounded-none font-medium tracking-wide shadow-2xl border-2 border-[#D4AF37]/30"
                >
                  START YOUR PROJECT
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-light">
                    {selectedService ? `Commission Request: ${selectedService.title}` : 'Start Your Custom Project'}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    Share your vision and our artists will bring it to life
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmitCommission} className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Your name"
                        className="mt-2 rounded-none"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="your@email.com"
                        className="mt-2 rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+91 98765 43210"
                      className="mt-2 rounded-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="artworkType" className="text-sm font-medium">Type of Artwork *</Label>
                    <Select value={formData.artworkType} onValueChange={(value) => setFormData({ ...formData, artworkType: value })}>
                      <SelectTrigger className="mt-2 rounded-none">
                        <SelectValue placeholder="Select artwork type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                        <SelectItem value="abstract">Abstract</SelectItem>
                        <SelectItem value="pet-portrait">Pet Portrait</SelectItem>
                        <SelectItem value="family-portrait">Family Portrait</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      placeholder="Describe your vision in detail... Include information about size, style, colors, subject matter, etc."
                      rows={5}
                      className="mt-2 rounded-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="budget" className="text-sm font-medium">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                        <SelectTrigger className="mt-2 rounded-none">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                          <SelectItem value="10000-25000">₹10,000 - ₹25,000</SelectItem>
                          <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                          <SelectItem value="50000+">₹50,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeline" className="text-sm font-medium">Preferred Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                        <SelectTrigger className="mt-2 rounded-none">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2-3-weeks">2-3 weeks</SelectItem>
                          <SelectItem value="1-month">1 month</SelectItem>
                          <SelectItem value="2-months">2 months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="submit"
                      className="flex-1 bg-[#D4AF37] hover:bg-[#C19B2A] text-white py-6 text-base rounded-none"
                    >
                      SUBMIT REQUEST
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCommissionFormOpen(false)}
                      className="flex-1 py-6 text-base rounded-none"
                    >
                      CANCEL
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </section>
    </div>
  );
}