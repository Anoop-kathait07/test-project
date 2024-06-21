import Backdrop from '@mui/material/Backdrop';
import { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import loader from '@/animation-files/Animation - 1716180978118.json';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

const Spinner = () => {
  const isBackdropOpen = useSelector((state: any): any => state.customization.isLoader);
  const lottieControl = useRef<LottieRefCurrentProps>(null);
  return (
    <>
      {isBackdropOpen && (
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <Lottie
            lottieRef={lottieControl}
            onComplete={() => {
              lottieControl.current?.goToAndPlay(80, true);
            }}
            animationData={loader}
            loop={true}
          />
        </Backdrop>
      )}
    </>
  );
};

export default memo(Spinner);
