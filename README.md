## Remotion in React Native

This is a proof of concept for creating videos in React Native using Remotion, presented at [App.js Conf 2023](https://appjs.co/).

### Features

- Define a video with Remotion APIs: `useCurrentFrame()`, `<Sequence>`, `spring()`
- Play a preview of the video and update it based on user interaction
- Render the video into an MP4 on-device.

### Limitations

To start, some Remotion features were not considered:

- **No audio support**: Videos will have no sound.
- **No support for components and APIs that use DOM APIs**: `<AbsoluteFill>`, `<Video>`, `<IFrame>` etc.
- **Unoptimized performance**: Primitive re-rendering using React on the JS thread.
- **Codecs**: Only MP4s are supported.
- **Async operations**: The renderer does not wait for `delayRender()` calls.
- **No multithreading**: The video is rendered frame-by-frame on the main thread.
