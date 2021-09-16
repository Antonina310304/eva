import React, { useCallback, memo, FC } from 'react';
import loadable from '@loadable/component';
import { Options, YouTubeProps } from 'react-youtube';

export interface AsyncYouTubeProps extends YouTubeProps {
  className?: string;
  opts: Options;
}

const LoadableYouTube = loadable.lib(() => import('react-youtube'));

const AsyncYouTube: FC<AsyncYouTubeProps> = (props) => {
  const { children, opts = {}, onReady, ...restProps } = props;
  const options: Options = opts;

  if (!options.playerVars) {
    options.playerVars = {};
  }

  if (!options.playerVars.rel) {
    options.playerVars.rel = 0;
  }

  if (!options.playerVars.modestbranding) {
    options.playerVars.modestbranding = 1;
  }

  //
  const handleReady = useCallback(
    (e) => {
      // Принудительно включаем видео, если есть опция autoplay,
      // потому что на мобилках опция работает некорректно
      if (opts && opts.playerVars && opts.playerVars.autoplay) {
        e.target.playVideo();
      }

      if (onReady) {
        onReady(e);
      }
    },
    [onReady, opts],
  );

  return (
    <LoadableYouTube>
      {({ default: YouTube }) => (
        <YouTube {...restProps} opts={options} onReady={handleReady}>
          {children}
        </YouTube>
      )}
    </LoadableYouTube>
  );
};

export default memo(AsyncYouTube);
