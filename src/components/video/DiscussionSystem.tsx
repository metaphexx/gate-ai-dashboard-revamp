
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Heart, Reply, MoreHorizontal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Comment[];
  isLiked: boolean;
}

interface DiscussionSystemProps {
  lessonId: string;
}

const DiscussionSystem: React.FC<DiscussionSystemProps> = ({ lessonId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Mock initial comments
  useEffect(() => {
    const mockComments: Comment[] = [
      {
        id: '1',
        author: 'Sarah Chen',
        content: 'Great explanation of algebraic concepts! The step-by-step approach really helped me understand.',
        timestamp: new Date('2024-01-15T10:30:00'),
        likes: 5,
        replies: [
          {
            id: '1-1',
            author: 'Mike Johnson',
            content: 'I agree! The visual examples made it much clearer.',
            timestamp: new Date('2024-01-15T11:00:00'),
            likes: 2,
            replies: [],
            isLiked: false
          }
        ],
        isLiked: false
      },
      {
        id: '2',
        author: 'Alex Rodriguez',
        content: 'Could you explain more about the distributive property? I\'m still a bit confused about when to use it.',
        timestamp: new Date('2024-01-14T14:20:00'),
        likes: 3,
        replies: [],
        isLiked: false
      }
    ];

    const saved = localStorage.getItem(`comments-${lessonId}`);
    if (saved) {
      setComments(JSON.parse(saved));
    } else {
      setComments(mockComments);
    }
  }, [lessonId]);

  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(`comments-${lessonId}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      content: newComment.trim(),
      timestamp: new Date(),
      likes: 0,
      replies: [],
      isLiked: false
    };

    const updatedComments = [comment, ...comments];
    saveComments(updatedComments);
    setNewComment('');
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted",
    });
  };

  const addReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: 'You',
      content: replyContent.trim(),
      timestamp: new Date(),
      likes: 0,
      replies: [],
      isLiked: false
    };

    const updatedComments = comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply]
        };
      }
      return comment;
    });

    saveComments(updatedComments);
    setReplyContent('');
    setReplyingTo(null);
    
    toast({
      title: "Reply added",
      description: "Your reply has been posted",
    });
  };

  const toggleLike = (commentId: string, isReply = false, parentId?: string) => {
    const updatedComments = comments.map(comment => {
      if (isReply && parentId && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                isLiked: !reply.isLiked
              };
            }
            return reply;
          })
        };
      } else if (!isReply && comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    });

    saveComments(updatedComments);
  };

  const toggleShowReplies = (commentId: string) => {
    const newShowReplies = new Set(showReplies);
    if (newShowReplies.has(commentId)) {
      newShowReplies.delete(commentId);
    } else {
      newShowReplies.add(commentId);
    }
    setShowReplies(newShowReplies);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Discussion ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pb-16 md:pb-4">
        {/* Add new comment */}
        <div className="space-y-2">
          <Textarea
            placeholder="Share your thoughts or ask a question..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <div className="flex justify-end">
            <Button onClick={addComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>

        {/* Comments list */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              {/* Main comment */}
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(new Date(comment.timestamp))}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-6 px-2 ${comment.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                      onClick={() => toggleLike(comment.id)}
                    >
                      <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
                      {comment.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-gray-500"
                      onClick={() => setReplyingTo(comment.id)}
                    >
                      <Reply className="w-3 h-3 mr-1" />
                      Reply
                    </Button>
                    {comment.replies.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-gray-500"
                        onClick={() => toggleShowReplies(comment.id)}
                      >
                        {showReplies.has(comment.id) ? 'Hide' : 'Show'} replies ({comment.replies.length})
                      </Button>
                    )}
                  </div>

                  {/* Reply form */}
                  {replyingTo === comment.id && (
                    <div className="mt-2 space-y-2">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => addReply(comment.id)}
                          disabled={!replyContent.trim()}
                        >
                          Reply
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Replies */}
              {showReplies.has(comment.id) && comment.replies.length > 0 && (
                <div className="ml-11 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {reply.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-xs">{reply.author}</span>
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(new Date(reply.timestamp))}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 mb-2">{reply.content}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`h-5 px-1 text-xs ${reply.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                          onClick={() => toggleLike(reply.id, true, comment.id)}
                        >
                          <Heart className={`w-2 h-2 mr-1 ${reply.isLiked ? 'fill-current' : ''}`} />
                          {reply.likes}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {comments.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussionSystem;
