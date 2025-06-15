
import { Camera, Frame, Instagram } from 'lucide-react';

const skills = [
  {
    icon: Camera,
    title: 'Street Photography',
    description: 'Capturing authentic moments in urban environments'
  }, {
    icon: Frame,
    title: 'Black & White',
    description: 'Finding emotion and contrast in monochrome'
  }, {
    icon: Instagram,
    title: 'Visual Storytelling',
    description: 'Every frame tells a unique story'
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-8">
            My Eye for Moments
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            I capture honest, everyday moments through minimal, quiet frames — with a strong sense of mood and story, especially in black & white.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border border-border hover:border-primary transition-colors duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <skill.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold text-xl mb-3">{skill.title}</h3>
              <p className="text-muted-foreground">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
