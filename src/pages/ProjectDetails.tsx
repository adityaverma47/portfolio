
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import { projects } from '@/data/projects';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { useEffect } from 'react';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find((p) => p.id === Number(id));

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link to="/" className="text-primary hover:underline">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4 md:px-8">
                    {/* Back Button */}
                    <Link
                        to="/#projects"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft size={20} />
                        Back to Projects
                    </Link>

                    {/* Project Header */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                                {project.title}
                            </h1>

                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {project.longDescription}
                            </p>

                            <div className="flex gap-4 pt-4">
                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full transition-all hover:scale-105 glow-primary"
                                    >
                                        Live Demo
                                        <ArrowUpRight size={20} />
                                    </a>
                                )}
                                {project.repoLink && (
                                    <a
                                        href={project.repoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 glass text-foreground font-semibold rounded-full transition-all hover:bg-secondary"
                                    >
                                        <GithubLogo size={20} />
                                        View Code
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Project Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 group">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Features Section */}
                    {project.features && (
                        <div className="mb-16">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Features</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {project.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="glass p-6 rounded-xl flex items-start gap-3"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <p className="text-muted-foreground">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectDetails;
