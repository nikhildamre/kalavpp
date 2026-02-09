import { useState } from 'react';
import { Filter, SlidersHorizontal, Grid, List, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { allProducts } from '../../data/mockData';
import { motion } from 'motion/react';

interface ProductCategoryPageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export function ProductCategoryPage({ onNavigate }: ProductCategoryPageProps) {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['Original Art', 'Prints & Merchandise', 'Digital Art'];
  const mediums = ['Acrylic on Canvas', 'Oil on Canvas', 'Watercolor', 'Digital Illustration', 'Giclée Print', 'Bronze'];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleMedium = (medium: string) => {
    setSelectedMediums(prev =>
      prev.includes(medium) ? prev.filter(m => m !== medium) : [...prev, medium]
    );
  };

  const filteredProducts = allProducts.filter(product => {
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const mediumMatch = selectedMediums.length === 0 || selectedMediums.includes(product.medium);
    return priceMatch && categoryMatch && mediumMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'name': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium mb-6 text-gray-900">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={50000}
          step={1000}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-gray-600 font-light">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-lg font-medium mb-6 text-gray-900">Category</h3>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer font-light text-gray-700 hover:text-gray-900"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-lg font-medium mb-6 text-gray-900">Medium</h3>
        <div className="space-y-4">
          {mediums.map((medium) => (
            <div key={medium} className="flex items-center space-x-3">
              <Checkbox
                id={`medium-${medium}`}
                checked={selectedMediums.includes(medium)}
                onCheckedChange={() => toggleMedium(medium)}
              />
              <Label
                htmlFor={`medium-${medium}`}
                className="text-sm cursor-pointer font-light text-gray-700 hover:text-gray-900"
              >
                {medium}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-8">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setSelectedCategories([]);
            setSelectedMediums([]);
            setPriceRange([0, 50000]);
          }}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Decorative image removed */}
            <h1 className="text-5xl lg:text-6xl mb-4 font-light tracking-tight text-gray-900">
              Art Collection
            </h1>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Discover unique artworks from talented artists around India
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24 bg-white border rounded-none p-8">
              <div className="flex items-center gap-2 mb-8">
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-medium text-gray-900">Filters</h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-light">
                  {sortedProducts.length} artworks
                </span>
                {(selectedCategories.length > 0 || selectedMediums.length > 0) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedMediums([]);
                    }}
                    className="text-sm font-light"
                  >
                    Clear filters
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="hidden md:flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="px-3"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 rounded-none">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>

                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Refine your search results
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-8">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategories.length > 0 || selectedMediums.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedCategories.map(cat => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    onClick={() => toggleCategory(cat)}
                  >
                    {cat} ×
                  </Badge>
                ))}
                {selectedMediums.map(medium => (
                  <Badge
                    key={medium}
                    variant="secondary"
                    className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    onClick={() => toggleMedium(medium)}
                  >
                    {medium} ×
                  </Badge>
                ))}
              </div>
            )}

            {/* Products */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg font-light">No artworks match your filters</p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedMediums([]);
                    setPriceRange([0, 50000]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <motion.div
                className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' : 'space-y-6'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer"
                    onClick={() => onNavigate('product-detail', product.id)}
                  >
                    {viewMode === 'grid' ? (
                      <div>
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-100">
                              <Heart className="w-5 h-5 text-gray-900" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xl font-medium text-gray-900 group-hover:text-[#D4AF37] transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 font-light">{product.artist}</p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-2xl font-light text-gray-900">
                              ₹{product.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 tracking-wide">{product.medium}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow">
                        <div className="flex gap-6">
                          <div className="w-64 h-64 shrink-0 overflow-hidden bg-gray-100">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>

                          <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                              <h3 className="text-2xl font-medium text-gray-900 mb-2 group-hover:text-[#D4AF37] transition-colors">
                                {product.title}
                              </h3>
                              <p className="text-gray-600 font-light mb-4">by {product.artist}</p>
                              <div className="flex gap-2 mb-4">
                                <Badge variant="secondary">{product.category}</Badge>
                                <Badge variant="secondary">{product.medium}</Badge>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-3xl font-light text-gray-900">
                                ₹{product.price.toLocaleString()}
                              </span>
                              <Button className="bg-[#D4AF37] hover:bg-[#C19B2A]">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
