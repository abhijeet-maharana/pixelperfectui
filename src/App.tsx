import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { SiteHeader } from "./components/site-header";
import HomePage from "./pages/home";
import GalleryPage from "./pages/gallery";
import DesignDetailPage from "./pages/design-detail";
import BlogPage from "./pages/blog";
import BlogPostPage from "./pages/blog-post";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/:id" element={<DesignDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
