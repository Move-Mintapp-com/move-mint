import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  Building2, 
  Users, 
  MapPin, 
  Mail, 
  Phone, 
  Upload,
  Download,
  CheckCircle
} from 'lucide-react';

export function SponsorSignupScreen() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    businessCategory: '',
    description: '',
    proposedOffer: '',
    logo: null as File | null
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessCategories = [
    'Cafe & Restaurant',
    'Gym & Fitness',
    'Retail & Shopping',
    'Health & Wellness',
    'Entertainment',
    'Beauty & Spa',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call to /api/partners/apply
      const response = await fetch('/api/partners/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pb-20 pt-4 px-4">
        <div className="max-w-md mx-auto mt-12 text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl text-white mb-4">Application Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your interest in becoming a Move-Mint partner. 
            We'll review your application and get back to you within 2-3 business days.
          </p>
          
          <Card className="p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <h4>Letter of Understanding</h4>
                  <p className="text-sm text-muted-foreground">Partnership agreement template</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Download PDF
              </Button>
            </div>
          </Card>

          <Button onClick={() => setIsSubmitted(false)} className="w-full">
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 pt-4 px-4">
      <div className="mb-6">
        <h1 className="text-2xl text-white mb-2">Become a Sponsor Partner</h1>
        <p className="text-muted-foreground">Join Move-Mint and offer exclusive rewards to our active community</p>
      </div>

      {/* Benefits Section */}
      <Card className="p-4 mb-6">
        <h3 className="mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Partner Benefits
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <div className="text-lg font-medium text-primary">10,000+</div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <div className="text-lg font-medium text-primary">Bahrain</div>
            <div className="text-xs text-muted-foreground">Local Focus</div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">Geo-targeted promotions</Badge>
          <Badge variant="secondary">Health-conscious audience</Badge>
          <Badge variant="secondary">No upfront costs</Badge>
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <Card className="p-4">
          <h3 className="mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Company Information
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Your business name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                placeholder="Full name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="contact@company.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+973 XXXX XXXX"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Business Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Street, City, Bahrain"
              />
            </div>

            <div>
              <Label htmlFor="businessCategory">Business Category *</Label>
              <Select onValueChange={(value) => handleInputChange('businessCategory', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Business Details */}
        <Card className="p-4">
          <h3 className="mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Business Details
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Briefly describe your business and what makes it special"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="proposedOffer">Proposed Discount/Offer *</Label>
              <Textarea
                id="proposedOffer"
                value={formData.proposedOffer}
                onChange={(e) => handleInputChange('proposedOffer', e.target.value)}
                placeholder="e.g., 20% off all menu items, BD 5.000 off gym membership"
                required
                rows={2}
              />
            </div>

            <div>
              <Label>Company Logo</Label>
              <div className="mt-2">
                <label className="flex items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer hover:bg-muted/20 transition-colors">
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      {formData.logo ? formData.logo.name : 'Click to upload logo'}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 2MB
                    </span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Terms */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <input type="checkbox" id="terms" className="mt-1" required />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the Move-Mint Partner Terms and Conditions and understand that 
              approval is subject to review. Partnership fees may apply based on business size and offer type.
            </label>
          </div>
        </Card>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting Application...' : 'Submit Partnership Application'}
        </Button>
      </form>
    </div>
  );
}