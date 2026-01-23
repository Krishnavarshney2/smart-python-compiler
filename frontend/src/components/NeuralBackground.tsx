import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  connections: number[];
}

interface DataPacket {
  id: number;
  fromNode: number;
  toNode: number;
  progress: number;
}

const NeuralBackground = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [packets, setPackets] = useState<DataPacket[]>([]);

  useEffect(() => {
    // Generate neural network nodes
    const generatedNodes: Node[] = [];
    const nodeCount = 25;
    
    for (let i = 0; i < nodeCount; i++) {
      const node: Node = {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        connections: [],
      };
      
      // Connect to 2-3 nearby nodes
      for (let j = 0; j < i; j++) {
        const distance = Math.sqrt(
          Math.pow(node.x - generatedNodes[j].x, 2) +
          Math.pow(node.y - generatedNodes[j].y, 2)
        );
        if (distance < 35 && node.connections.length < 3) {
          node.connections.push(j);
          generatedNodes[j].connections.push(i);
        }
      }
      generatedNodes.push(node);
    }
    setNodes(generatedNodes);
  }, []);

  // Animate data packets
  useEffect(() => {
    const interval = setInterval(() => {
      if (nodes.length === 0) return;
      
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      if (randomNode.connections.length > 0) {
        const targetNode = randomNode.connections[Math.floor(Math.random() * randomNode.connections.length)];
        setPackets(prev => [
          ...prev.slice(-8),
          {
            id: Date.now(),
            fromNode: randomNode.id,
            toNode: targetNode,
            progress: 0,
          },
        ]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [nodes]);

  return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Tech Grid Base */}
      <div className="absolute inset-0 tech-grid opacity-40" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-[0.03]" />
      
      {/* Hex Pattern Overlay */}
      <div className="absolute inset-0 hex-pattern opacity-20" />
      
      {/* Neural Network SVG */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(173 80% 50%)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(280 100% 70%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(173 80% 50%)" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Connection Lines */}
        {nodes.map((node) =>
          node.connections.map((targetId) => {
            const target = nodes[targetId];
            if (!target) return null;
            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 2, delay: node.id * 0.05 }}
              />
            );
          })
        )}
        
        {/* Neural Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={node.id}>
            {/* Outer glow */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="8"
              fill="hsl(173 80% 50%)"
              fill-opacity="0.1"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ 
                duration: 3, 
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: Math.random() * 5
              }}
            />
            {/* Inner node */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              fill="hsl(173 80% 50%)"
              filter="url(#glow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
          </motion.g>
        ))}
        
        {/* Animated Data Packets */}
        {packets.map((packet) => {
          const fromNode = nodes[packet.fromNode];
          const toNode = nodes[packet.toNode];
          if (!fromNode || !toNode) return null;
          
          return (
            <motion.circle
              key={packet.id}
              r="4"
              fill="hsl(280 100% 70%)"
              filter="url(#glow)"
              initial={{ 
                cx: `${fromNode.x}%`, 
                cy: `${fromNode.y}%`,
                opacity: 1,
                scale: 1
              }}
              animate={{ 
                cx: `${toNode.x}%`, 
                cy: `${toNode.y}%`,
                opacity: 0,
                scale: 0.5
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onAnimationComplete={() => {
                setPackets(prev => prev.filter(p => p.id !== packet.id));
              }}
            />
          );
        })}
      </svg>
      
      {/* Floating Binary/Hex Code */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs text-primary/20 select-none"
            style={{
              left: `${10 + (i % 6) * 15}%`,
              top: `${5 + Math.floor(i / 6) * 50}%`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          >
            {i % 2 === 0 
              ? `0x${Math.random().toString(16).slice(2, 6).toUpperCase()}`
              : `${Math.floor(Math.random() * 2)}${Math.floor(Math.random() * 2)}${Math.floor(Math.random() * 2)}${Math.floor(Math.random() * 2)}`
            }
          </motion.div>
        ))}
      </div>
      
      {/* Vertical Data Streams */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            style={{
              left: `${15 + i * 15}%`,
              height: '30%',
            }}
            initial={{ top: '-30%', opacity: 0 }}
            animate={{ 
              top: '100%',
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3 + i * 0.5,
              delay: i * 0.8,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>
      
      {/* Corner Circuit Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-30">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.path
            d="M0 50 L50 50 L50 20 L80 20 L80 0"
            stroke="hsl(173 80% 50%)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.path
            d="M0 80 L30 80 L30 100 L60 100"
            stroke="hsl(280 100% 70%)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
          <circle cx="50" cy="50" r="3" fill="hsl(173 80% 50%)" />
          <circle cx="80" cy="20" r="2" fill="hsl(280 100% 70%)" />
          <circle cx="30" cy="80" r="2" fill="hsl(173 80% 50%)" />
          <circle cx="60" cy="100" r="3" fill="hsl(280 100% 70%)" />
        </svg>
      </div>
      
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-30 rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.path
            d="M0 50 L50 50 L50 20 L80 20 L80 0"
            stroke="hsl(280 100% 70%)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.path
            d="M0 80 L30 80 L30 100 L60 100"
            stroke="hsl(173 80% 50%)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.3 }}
          />
          <circle cx="50" cy="50" r="3" fill="hsl(280 100% 70%)" />
          <circle cx="80" cy="20" r="2" fill="hsl(173 80% 50%)" />
        </svg>
      </div>
    </div>
  );
};

export default NeuralBackground;
