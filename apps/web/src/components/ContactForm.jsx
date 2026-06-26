
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    department: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, department: value }));
    if (errors.department) setErrors(prev => ({ ...prev, department: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.department) newErrors.department = 'Please select a department';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Your message has been sent successfully. Our team will contact you shortly.');
      setFormData({ name: '', email: '', subject: '', department: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`bg-background text-foreground ${errors.name ? 'border-destructive' : ''}`}
            placeholder="Jane Doe"
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-background text-foreground ${errors.email ? 'border-destructive' : ''}`}
            placeholder="jane@example.com"
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="bg-background text-foreground"
            placeholder="How can we help?"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Direct To *</Label>
          <Select value={formData.department} onValueChange={handleSelectChange}>
            <SelectTrigger id="department" className={`bg-background text-foreground ${errors.department ? 'border-destructive' : ''}`}>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="agri">Agri Operations</SelectItem>
              <SelectItem value="investor">Investor Relations</SelectItem>
              <SelectItem value="careers">Human Resources (Careers)</SelectItem>
              <SelectItem value="media">Media & PR</SelectItem>
            </SelectContent>
          </Select>
          {errors.department && <p className="text-xs text-destructive">{errors.department}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`bg-background text-foreground resize-none ${errors.message ? 'border-destructive' : ''}`}
          placeholder="Please provide detailed information about your inquiry..."
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto gap-2 px-8"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
        {!isSubmitting && <Send className="w-4 h-4" />}
      </Button>
    </form>
  );
}

export default ContactForm;
