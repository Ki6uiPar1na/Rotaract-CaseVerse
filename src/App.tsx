import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Competition = lazy(() => import("@/pages/Competition"));
const RoundDetails = lazy(() => import("@/pages/RoundDetails"));
const GrandFinale = lazy(() => import("@/pages/GrandFinale"));
const Timeline = lazy(() => import("@/pages/Timeline"));
const News = lazy(() => import("@/pages/News"));
const NewsDetails = lazy(() => import("@/pages/NewsDetails"));
const Sponsors = lazy(() => import("@/pages/Sponsors"));
const Judges = lazy(() => import("@/pages/Judges"));
const Results = lazy(() => import("@/pages/Results"));
const Prizes = lazy(() => import("@/pages/Prizes"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contact = lazy(() => import("@/pages/Contact"));
const Register = lazy(() => import("@/pages/Register"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted">Loading...</span>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
          <Route path="/competition" element={<Suspense fallback={<PageLoader />}><Competition /></Suspense>} />
          <Route path="/competition/round-1" element={<Suspense fallback={<PageLoader />}><RoundDetails roundId="round-1" /></Suspense>} />
          <Route path="/competition/round-2" element={<Suspense fallback={<PageLoader />}><RoundDetails roundId="round-2" /></Suspense>} />
          <Route path="/competition/grand-finale" element={<Suspense fallback={<PageLoader />}><GrandFinale /></Suspense>} />
          <Route path="/timeline" element={<Suspense fallback={<PageLoader />}><Timeline /></Suspense>} />
          <Route path="/news" element={<Suspense fallback={<PageLoader />}><News /></Suspense>} />
          <Route path="/news/:slug" element={<Suspense fallback={<PageLoader />}><NewsDetails /></Suspense>} />
          <Route path="/sponsors" element={<Suspense fallback={<PageLoader />}><Sponsors /></Suspense>} />
          <Route path="/judges" element={<Suspense fallback={<PageLoader />}><Judges /></Suspense>} />
          <Route path="/results" element={<Suspense fallback={<PageLoader />}><Results /></Suspense>} />
          <Route path="/prizes" element={<Suspense fallback={<PageLoader />}><Prizes /></Suspense>} />
          <Route path="/faq" element={<Suspense fallback={<PageLoader />}><FAQ /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={<PageLoader />}><Register /></Suspense>} />
          <Route path="/dashboard" element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
        </Route>

        <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}
