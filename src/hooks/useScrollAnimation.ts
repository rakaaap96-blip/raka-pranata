import useInView from './useInView';

function useScrollAnimation(threshold = 0.1) {
  return useInView(threshold);
}

export default useScrollAnimation;