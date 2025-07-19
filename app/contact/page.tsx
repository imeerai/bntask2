"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, Headphones } from "lucide-react"

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      })
      setIsLoading(false)

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Headphones className="h-8 w-8 text-white" />
          </div>
          <h1 className="hero-title mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-sm text-gray-400 max-w-3xl mx-auto">
            Have questions or need support? We'd love to hear from you. Send us a message and we'll respond as soon as
            possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="glass-effect border-gray-800/50">
            <CardHeader>
              <CardTitle className="text-base">Send us a Message</CardTitle>
              <CardDescription className="text-xs">
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder=""
                      required
                      className="bg-gray-800/50 border-gray-700 h-9 text-xs placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder=""
                      required
                      className="bg-gray-800/50 border-gray-700 h-9 text-xs placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder=""
                    required
                    className="bg-gray-800/50 border-gray-700 h-9 text-xs placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder=""
                    required
                    className="bg-gray-800/50 border-gray-700 h-9 text-xs placeholder:text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder=""
                    rows={4}
                    required
                    className="bg-gray-800/50 border-gray-700 text-xs placeholder:text-gray-500"
                  />
                </div>

                <Button type="submit" className="w-full btn-primary h-9 text-xs" disabled={isLoading}>
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-3 w-3" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="glass-effect border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
                <CardDescription className="text-xs">Reach out to us through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs">Email</h3>
                    <p className="text-gray-400 text-xs">admin@imeer.ai</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs">Phone</h3>
                    <p className="text-gray-400 text-xs">+92 318 222 1812</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs">Office</h3>
                    <p className="text-gray-400 text-xs">
                      R 123 Business District
                      <br />
                      Malir, Karachi Pakistan
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Clock className="h-4 w-4" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Sunday</span>
                  <span className="text-red-400">Closed</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-800/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageSquare className="h-4 w-4" />
                  Quick Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-3 text-xs">
                  For immediate assistance, you can also reach out to us through:
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• Live chat (available 24/7)</li>
                  <li>• WhatsApp: +92 318 222 1812</li>
                  <li>• Support portal in your dashboard</li>
                  <li>• Emergency hotline for urgent issues</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
