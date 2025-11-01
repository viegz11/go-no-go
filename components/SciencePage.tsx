
import React from 'react';
import Card from './Card';
import Button from './Button';

interface SciencePageProps {
  onBack: () => void;
}

const SciencePage: React.FC<SciencePageProps> = ({ onBack }) => {
  return (
    <Card>
      <h2 className="text-3xl font-bold text-center mb-6">Why Go/No-Go Works</h2>
      
      <div className="prose prose-slate max-w-none text-slate-600">
        <p>The Go/No-Go test is a classic tool in cognitive neuroscience used to measure and train an individual's capacity for <strong>response inhibition</strong>. This is the brain's ability to suppress a prepotent, or automatic, response. It's a key function of our executive controls, managed primarily by the prefrontal cortex.</p>

        <h3 className="text-slate-700">The Neuroscience of Impulse Control</h3>
        <p>When you constantly check social media, you're reinforcing a neural pathway. The "Go" signal in this test (the green circle) creates a similar prepotent response: "see stimulus, tap button". The "No-Go" signal (the social media icon) forces you to actively inhibit that trained response. By repeatedly practicing this inhibition, you are strengthening the neural circuits in your prefrontal cortex responsible for self-control.</p>
        
        <h3 className="text-slate-700">Benefits of Regular Training</h3>
        <ul>
            <li><strong>Better Focus:</strong> Strengthening your prefrontal cortex helps you resist distractions and maintain focus on important tasks.</li>
            <li><strong>Reduced Compulsive Checking:</strong> It makes you more mindful of your digital habits, helping to break the automatic "urge-to-check" cycle.</li>
            <li><strong>Stronger Discipline:</strong> The mental "muscle" you build for response inhibition can be applied to other areas of life, from diet to productivity.</li>
        </ul>
        
        <p>Think of it as a workout for your brain's braking system. The more you train, the better you become at stopping impulsive actions, whether it's tapping a button in a game or mindlessly opening a social media app.</p>
      </div>

      <div className="mt-8">
        <Button onClick={onBack} variant="ghost">Back to Home</Button>
      </div>
    </Card>
  );
};

export default SciencePage;
