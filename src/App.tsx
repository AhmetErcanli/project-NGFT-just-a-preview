import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, Search, Menu, Bell, ChevronDown, Mic, Plus, VideoIcon } from 'lucide-react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [manualFilter, setManualFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideoFilter, setSelectedVideoFilter] = useState('all');
  const [aiCategories, setAiCategories] = useState([
    { id: 'nostalgia', label: 'Nostalgic Memories', count: 156 },
    { id: 'meme-culture', label: 'Meme References', count: 89 },
    { id: 'music-analysis', label: 'Music Analysis', count: 45 },
    { id: 'dance-moves', label: 'Dance Moves', count: 67 },
    { id: 'cultural-impact', label: 'Cultural Impact', count: 34 },
    { id: 'production-quality', label: 'Production Quality', count: 23 }
  ]);

  const comments = [
    {
      id: 1,
      user: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
      comment: 'This song defined the 80s! The synthesizer work is incredible, especially at 1:24.',
      likes: '1.2K',
      time: '2 days ago',
      type: ['music-analysis', 'nostalgia']
    },
    {
      id: 2,
      user: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
      comment: 'That iconic dance move at 2:35 has been copied countless times, but no one does it like Rick!',
      likes: '856',
      time: '1 day ago',
      type: ['dance-moves']
    },
    {
      id: 3,
      user: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop',
      comment: 'POV: Its 2024 and you just got Rick Rolled for the 100th time 😂',
      likes: '2.3K',
      time: '5 hours ago',
      type: ['meme-culture', 'humor']
    },
    {
      id: 4,
      user: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
      comment: 'The video quality could be remastered for modern screens. Would love to see a 4K version!',
      likes: '432',
      time: '3 hours ago',
      type: ['suggestions', 'production-quality']
    },
    {
      id: 5,
      user: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop',
      comment: 'The chord progression in this song is actually quite sophisticated for a pop song of this era.',
      likes: '3.1K',
      time: '1 hour ago',
      type: ['music-analysis']
    },
    {
      id: 6,
      user: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop',
      comment: 'My kids discovered this through a meme and now they won\'t stop playing it! 😄 The Rick Roll lives on!',
      likes: '958',
      time: '4 hours ago',
      type: ['meme-culture', 'nostalgia']
    },
    {
      id: 7,
      user: 'Robert Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
      comment: 'The production value of this video was way ahead of its time. The lighting, camera work, and set design are all top-notch.',
      likes: '1.5K',
      time: '6 hours ago',
      type: ['production-quality']
    },
    {
      id: 8,
      user: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop',
      comment: 'This song has become such a huge part of internet culture. It\'s amazing how it transcended from just being a pop song to a global phenomenon.',
      likes: '2.7K',
      time: '1 day ago',
      type: ['cultural-impact']
    },
    {
      id: 9,
      user: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
      comment: 'The audio mixing on this track is phenomenal. The balance between the vocals and instruments is perfect.',
      likes: '891',
      time: '2 days ago',
      type: ['music-analysis', 'production-quality']
    },
    {
      id: 10,
      user: 'Sophie Turner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop',
      comment: 'I use this song to test if my students understand internet culture 😂 If they don\'t recognize it, they need a proper education in memes!',
      likes: '3.4K',
      time: '3 days ago',
      type: ['meme-culture', 'cultural-impact']
    }
  ];

  const suggestedVideos = [
    {
      title: "Rick Astley - Together Forever (Official Video)",
      channel: "Rick Astley",
      views: "12M",
      thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=320&h=180&fit=crop",
      time: "1 month ago",
      isNew: true
    },
    {
      title: "80s Greatest Hits - Best Songs of the 1980s",
      channel: "Music Time Machine",
      views: "5.2M",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=320&h=180&fit=crop",
      time: "2 weeks ago",
      isNew: true
    },
    {
      title: "The History of Rick Rolling - A Documentary",
      channel: "Internet Historian",
      views: "2.8M",
      thumbnail: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=320&h=180&fit=crop",
      time: "3 months ago"
    },
    {
      title: "Evolution of Music - 1980s Edition",
      channel: "Music Evolution",
      views: "892K",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=320&h=180&fit=crop",
      time: "5 days ago",
      isNew: true
    },
    {
      title: "Top 10 Music Videos of All Time",
      channel: "Music Charts",
      views: "1.5M",
      thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=320&h=180&fit=crop",
      time: "1 week ago"
    },
    {
      title: "Making of Never Gonna Give You Up",
      channel: "Behind the Scenes",
      views: "750K",
      thumbnail: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=320&h=180&fit=crop",
      time: "2 months ago"
    },
    {
      title: "Rick Astley Live at Wembley Stadium",
      channel: "Concert Channel",
      views: "3.1M",
      thumbnail: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=320&h=180&fit=crop",
      time: "4 months ago"
    },
    {
      title: "Pop Music Through the Decades",
      channel: "Music History",
      views: "980K",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=320&h=180&fit=crop",
      time: "6 days ago",
      isNew: true
    },
    {
      title: "Greatest One-Hit Wonders of the 80s",
      channel: "Retro Music",
      views: "2.2M",
      thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=320&h=180&fit=crop",
      time: "2 weeks ago"
    },
    {
      title: "Rick Astley - Interview and Live Performance",
      channel: "Music Talk Show",
      views: "445K",
      thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=320&h=180&fit=crop",
      time: "3 weeks ago"
    },
    {
      title: "The Best of Synthpop - 80s Collection",
      channel: "Retro Beats",
      views: "1.1M",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=320&h=180&fit=crop",
      time: "1 month ago"
    },
    {
      title: "Viral Videos That Changed the Internet",
      channel: "Internet Culture",
      views: "876K",
      thumbnail: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=320&h=180&fit=crop",
      time: "5 months ago"
    }
  ];

  const filteredComments = comments.filter(comment => {
    const matchesSearch = searchQuery.toLowerCase() === '' || 
      comment.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.type.includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'ai') {
      return comment.type.includes(manualFilter) && matchesSearch;
    }
    return comment.type.includes(selectedCategory) && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#0f0f0f] z-50 px-4 h-14 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-4">
          <Menu className="w-6 h-6" />
          <div className="flex items-center gap-1">
            <img src="https://www.youtube.com/s/desktop/7c155e84/img/favicon_144x144.png" alt="YouTube" className="h-5" />
            <span className="text-xl font-bold tracking-tighter hidden sm:inline" style={{ fontFamily: 'YouTube Sans, Roboto, sans-serif' }}>YouTube</span>
          </div>
        </div>
        <div className="flex-1 max-w-[732px] mx-4 flex items-center">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#121212] border border-gray-700 rounded-l-full px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button className="px-6 bg-[#222222] border border-l-0 border-gray-700 rounded-r-full">
              <Search className="w-5 h-5" />
            </button>
            <button className="ml-4 p-2 hover:bg-[#272727] rounded-full">
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden md:flex items-center gap-1 px-2 py-1.5 hover:bg-[#272727] rounded-lg">
            <VideoIcon className="w-5 h-5" />
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-[#272727] rounded-full">
            <Bell className="w-6 h-6" />
          </button>
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-sm font-medium">A</span>
          </div>
        </div>
      </header>

      <div className="pt-14 flex flex-col lg:flex-row">
        {/* Main Content */}
        <main className="flex-1 max-w-full lg:max-w-[calc(100%-400px)] p-4 lg:p-6">
          {/* Video Player */}
          <div className="aspect-video bg-gray-800 rounded-lg mb-4">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Video Info */}
          <h1 className="text-xl font-bold mb-2">Never Gonna Give You Up - Rick Astley</h1>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=40&h=40&fit=crop"
                alt="Channel Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium">Rick Astley</h3>
                <p className="text-sm text-gray-400">2.3M subscribers</p>
              </div>
              <button className="bg-white text-black px-4 py-2 rounded-full font-medium">
                Subscribe
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-[#272727] rounded-full">
                <button className="flex items-center gap-2 px-4 py-2 rounded-l-full hover:bg-[#3f3f3f]">
                  <ThumbsUp className="w-5 h-5" /> 2.1M
                </button>
                <div className="h-6 w-px bg-gray-700"></div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-r-full hover:bg-[#3f3f3f]">
                  <ThumbsDown className="w-5 h-5" />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#272727] rounded-full hover:bg-[#3f3f3f]">
                <Share2 className="w-5 h-5" /> Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#272727] rounded-full hover:bg-[#3f3f3f]">
                <Download className="w-5 h-5" /> Download
              </button>
              <button className="p-2 hover:bg-[#272727] rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-6">
              <h2 className="text-xl font-bold">Comments</h2>
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setManualFilter('');
                  }}
                  className="bg-[#272727] px-4 py-2 rounded-full focus:outline-none"
                >
                  <option value="all">All Comments</option>
                  <option value="ai">AI Categories</option>
                  <option value="humor">Humor</option>
                  <option value="suggestions">Suggestions</option>
                </select>
                
                {selectedCategory === 'ai' && (
                  <div className="flex flex-wrap gap-2">
                    {aiCategories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setManualFilter(category.id)}
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          manualFilter === category.id
                            ? 'bg-blue-600'
                            : 'bg-[#272727] hover:bg-[#3f3f3f]'
                        }`}
                      >
                        {category.label} ({category.count})
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="relative flex items-center w-full lg:w-auto">
                  <input
                    type="text"
                    placeholder="Search comments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#272727] pl-4 pr-10 py-2 rounded-full focus:outline-none w-full lg:w-64"
                  />
                  <Search className="w-4 h-4 absolute right-3 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {filteredComments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{comment.user}</h4>
                      <span className="text-sm text-gray-400">{comment.time}</span>
                    </div>
                    <p className="mt-1 break-words">{comment.comment}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button className="flex items-center gap-1 hover:bg-[#272727] p-2 rounded-full">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm text-gray-400">{comment.likes}</span>
                      </button>
                      <button className="hover:bg-[#272727] p-2 rounded-full">
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                      <button className="text-sm text-gray-400 hover:bg-[#272727] px-4 py-2 rounded-full">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Suggested Videos Sidebar */}
        <aside className="w-full lg:w-[400px] p-4 lg:p-6">
          {/* Video Filter Options */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedVideoFilter('all')}
              className={`px-3 py-1 rounded-lg whitespace-nowrap ${
                selectedVideoFilter === 'all' ? 'bg-white text-black' : 'bg-[#272727]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedVideoFilter('from-channel')}
              className={`px-3 py-1 rounded-lg whitespace-nowrap ${
                selectedVideoFilter === 'from-channel' ? 'bg-white text-black' : 'bg-[#272727]'
              }`}
            >
              From Rick Astley
            </button>
            <button
              onClick={() => setSelectedVideoFilter('related')}
              className={`px-3 py-1 rounded-lg whitespace-nowrap ${
                selectedVideoFilter === 'related' ? 'bg-white text-black' : 'bg-[#272727]'
              }`}
            >
              Related
            </button>
          </div>

          <div className="space-y-2">
            {suggestedVideos.map((video, i) => (
              <div key={i} className="flex gap-2 group cursor-pointer">
                <div className="relative w-40 lg:w-48">
                  <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0 relative">
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-400">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{video.channel}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    <span>{video.views} views</span>
                    <span className="mx-1">•</span>
                    <span>{video.time}</span>
                    {video.isNew && (
                      <>
                        <span className="mx-1">•</span>
                        <span className="text-xs bg-gray-600 px-1 rounded">New</span>
                      </>
                    )}
                  </div>
                  <button className="absolute top-0 right-0 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-[#272727] rounded-full transition-opacity">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;