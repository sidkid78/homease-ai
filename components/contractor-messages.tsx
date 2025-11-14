"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Clock, CheckCircle } from "lucide-react"

export function ContractorMessages() {
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      homeowner: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      leadType: "Bathroom Modification",
      lastMessage: "When would be a good time for you to come take a look?",
      timestamp: "2 hours ago",
      unread: true,
      messages: [
        {
          id: 1,
          sender: "homeowner",
          text: "Hi Mike, I'm interested in your services for bathroom modifications. I saw your profile and you seem like a great fit.",
          timestamp: "3 hours ago",
        },
        {
          id: 2,
          sender: "contractor",
          text: "Hello John! Thank you for reaching out. I'd be happy to help with your bathroom modifications. I have over 12 years of experience with accessibility improvements.",
          timestamp: "2.5 hours ago",
        },
        {
          id: 3,
          sender: "homeowner",
          text: "That's great to hear. We need grab bars installed and some non-slip surfaces. When would be a good time for you to come take a look?",
          timestamp: "2 hours ago",
        },
      ],
    },
    {
      id: 2,
      homeowner: {
        name: "Mary Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MJ",
      },
      leadType: "Ramp Installation",
      lastMessage: "Perfect! I'll see you tomorrow at 10 AM.",
      timestamp: "1 day ago",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "contractor",
          text: "Hi Mary, I received your request for a wheelchair ramp installation. I'd like to schedule a time to assess your entrance and provide a quote.",
          timestamp: "2 days ago",
        },
        {
          id: 2,
          sender: "homeowner",
          text: "Hi Mike! Yes, we definitely need a ramp. My husband uses a wheelchair and the current step is too high. When are you available?",
          timestamp: "1.5 days ago",
        },
        {
          id: 3,
          sender: "contractor",
          text: "I can come by tomorrow morning around 10 AM if that works for you. I'll bring some design options and we can discuss materials.",
          timestamp: "1 day ago",
        },
        {
          id: 4,
          sender: "homeowner",
          text: "Perfect! I'll see you tomorrow at 10 AM.",
          timestamp: "1 day ago",
        },
      ],
    },
    {
      id: 3,
      homeowner: {
        name: "Robert Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "RD",
      },
      leadType: "Grab Bar Installation",
      lastMessage: "Thank you for the quick response!",
      timestamp: "3 days ago",
      unread: false,
      messages: [
        {
          id: 1,
          sender: "homeowner",
          text: "Hi, I need grab bars installed in my guest bathroom. Can you provide a quote?",
          timestamp: "3 days ago",
        },
        {
          id: 2,
          sender: "contractor",
          text: "For a standard grab bar installation in a bathroom, the cost typically ranges from $400-800 depending on the number of bars and wall type. I can provide a detailed quote after a quick assessment.",
          timestamp: "3 days ago",
        },
        {
          id: 3,
          sender: "homeowner",
          text: "Thank you for the quick response!",
          timestamp: "3 days ago",
        },
      ],
    },
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    // Add message to conversation (in real app, this would be an API call)
    const updatedConversation = {
      ...selectedConversation,
      messages: [
        ...selectedConversation.messages,
        {
          id: selectedConversation.messages.length + 1,
          sender: "contractor",
          text: newMessage,
          timestamp: "Just now",
        },
      ],
    }

    setSelectedConversation(updatedConversation)
    setNewMessage("")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Conversations List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Messages
          </CardTitle>
          <CardDescription>Your conversations with homeowners</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-2 p-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation?.id === conversation.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.homeowner.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{conversation.homeowner.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium truncate">{conversation.homeowner.name}</p>
                        {conversation.unread && <div className="h-2 w-2 bg-primary rounded-full" />}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{conversation.leadType}</p>
                      <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        {conversation.unread && (
                          <Badge variant="secondary" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Message Thread */}
      <Card className="lg:col-span-2">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.homeowner.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedConversation.homeowner.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{selectedConversation.homeowner.name}</CardTitle>
                  <CardDescription>{selectedConversation.leadType}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((message: any) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "contractor" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === "contractor"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div className="flex items-center justify-end mt-2 space-x-1">
                          <Clock className="h-3 w-3 opacity-70" />
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                          {message.sender === "contractor" && <CheckCircle className="h-3 w-3 opacity-70" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
