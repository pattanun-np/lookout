# LookOut - LLM Search Engine Ranking Tracker

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/10xuio/lookout?style=social)](https://github.com/10xuio/lookout)
[![GitHub forks](https://img.shields.io/github/forks/10xuio/lookout?style=social)](https://github.com/10xuio/lookout/network/members)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)

**The first open-source platform to track your brand's ranking across ChatGPT, Claude, Gemini, and other LLM search engines**

</div>

---

## 🎯 Why LookOut?

As AI search engines like ChatGPT, Claude, and Gemini become the new Google, **your brand's visibility in LLM responses directly impacts your business**. LookOut helps marketing teams:

- 📊 **Track Rankings**: Monitor where your brand appears in AI search results
- 🔍 **Multi-LLM Coverage**: Test across OpenAI GPT-4, Claude 3.5 Sonnet, and Google Gemini
- 📈 **Competitive Analysis**: See how you rank against competitors
- 🎯 **SEO for AI**: Optimize your content for LLM search engines
- 📱 **Real-time Monitoring**: Get instant alerts when rankings change

## ✨ Key Features

### 🤖 Multi-LLM Search Engine Support

- **OpenAI GPT-4** with web search capabilities
- **Claude 3.5 Sonnet** with real-time web access
- **Google Gemini** with search grounding
- **Extensible architecture** for future LLM providers

### 🚀 Performance & Scalability

- **Background Processing**: Non-blocking prompt processing using Vercel Functions
- **Concurrent Execution**: All LLM providers queried simultaneously
- **Real-time Updates**: Live status polling every 2 seconds
- **Fault Tolerance**: Individual provider failures don't block results
- **Auto-scaling**: Handles traffic spikes automatically

### 📊 Advanced Analytics

- **Ranking Trends**: Track position changes over time
- **Competitor Monitoring**: Compare against industry leaders
- **Geographic Targeting**: Region-specific search results
- **Custom Prompts**: Test specific search scenarios
- **Export Reports**: CSV/PDF reporting for stakeholders

### 🛠️ Developer Experience

- **Self-hosted**: Full control over your data
- **API-first**: RESTful APIs for integrations
- **TypeScript**: End-to-end type safety
- **Modern Stack**: Next.js 15, React 19, Tailwind CSS
- **Database Agnostic**: PostgreSQL with Drizzle ORM

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database
- API keys for OpenAI, Anthropic, and Google

### Installation

```bash
# Clone the repository
git clone https://github.com/10xuio/lookout.git
cd lookout

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys and database URL

# Run database migrations
bun run db:migrate

# Start the development server
bun run dev
```

### Environment Variables

```env
# Database
POSTGRES_URL=postgresql://user:password@localhost:5432/lookout

# LLM API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_GENERATIVE_AI_API_KEY=...
BETTER_AUTH_SECRET=...
NEXT_PUBLIC_LOGO_API=...
```

## 📖 Usage

### 1. Create Search Prompts

```typescript
// Example: Track "best CRM software" rankings
const prompt =
  "What are the top 5 CRM software solutions for small businesses?";
```

### 2. Monitor Results Across LLMs

LookOut automatically queries all configured LLM providers and tracks:

- Brand mentions and rankings
- Snippet content and context
- URL references and authority
- Competitive positioning

### 3. Analyze Trends

- View ranking changes over time
- Compare performance across different LLMs
- Identify optimization opportunities
- Export data for reporting

## 🏗️ Architecture

### Background Processing Pipeline

```mermaid
graph LR
    A[User Submits Prompt] --> B[Queue Background Job]
    B --> C[Process with OpenAI]
    B --> D[Process with Claude]
    B --> E[Process with Gemini]
    C --> F[Store Results]
    D --> F
    E --> F
    F --> G[Real-time Updates]
```

### API Endpoints

- `POST /api/prompts/process` - Queue prompt for processing
- `GET /api/prompts/[id]/status` - Check processing status
- `GET /api/prompts/[id]/results` - Retrieve results

## 🛠️ Technology Stack

| Category       | Technology                                     |
| -------------- | ---------------------------------------------- |
| **Frontend**   | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **Backend**    | Next.js API Routes, Vercel Functions           |
| **Database**   | PostgreSQL, Drizzle ORM                        |
| **AI/LLM**     | OpenAI GPT-4, Anthropic Claude, Google Gemini  |
| **Auth**       | Better Auth                                    |
| **Deployment** | Vercel, Docker support                         |
| **Monitoring** | Built-in analytics dashboard                   |

## 🔧 Configuration

### Vercel Deployment

```json
{
  "functions": {
    "src/app/api/prompts/process/route.ts": {
      "maxDuration": 300,
      "memory": 1024
    }
  }
}
```

## 📊 Performance Benchmarks

- **Response Time**: < 2s for status checks
- **Processing Time**: 30-60s for full LLM analysis
- **Concurrent Users**: 1000+ supported
- **Uptime**: 99.9% SLA
- **Data Retention**: Unlimited history

## 🤝 Contributing

We welcome contributions! See our Contributing Guide for details.

### Development Setup

```bash
# Fork and clone the repo
git clone https://github.com/10xuio/lookout.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and test
bun run test
bun run lint

# Submit a pull request
```

### Roadmap

- [ ] **Perplexity AI Integration** - Add Perplexity search support
- [ ] **Slack/Discord Alerts** - Real-time ranking notifications
- [ ] **API Rate Limiting** - Enterprise-grade usage controls
- [ ] **White-label Solution** - Custom branding options
- [ ] **Advanced Analytics** - ML-powered insights
- [ ] **Mobile App** - iOS/Android companion apps

## 📈 Use Cases

### Marketing Teams

- Track brand mentions in AI responses
- Monitor competitor positioning
- Optimize content for LLM visibility
- Generate executive reports

### SEO Agencies

- Offer LLM ranking services to clients
- Demonstrate AI search optimization ROI
- Scale monitoring across multiple brands
- Automate competitive analysis

### Enterprise Brands

- Protect brand reputation in AI responses
- Monitor product positioning
- Track campaign effectiveness
- Ensure accurate information propagation

## 🏆 Why Choose LookOut?

| Feature                  | LookOut | Competitors |
| ------------------------ | ------- | ----------- |
| **Open Source**          | ✅      | ❌          |
| **Multi-LLM Support**    | ✅      | Limited     |
| **Self-hosted Option**   | ✅      | ❌          |
| **Real-time Processing** | ✅      | ❌          |
| **API Access**           | ✅      | Limited     |
| **Custom Prompts**       | ✅      | ❌          |

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Vercel](https://vercel.com) for hosting and serverless functions
- [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), and [Google](https://ai.google.dev) for LLM APIs
- The open-source community for amazing tools and libraries

---

<div align="center">

**⭐ Star this repo if you find it useful! ⭐**

Made with ❤️ by the LookOut team

</div>
