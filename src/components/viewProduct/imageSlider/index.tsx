import { useEffect, useRef, useState } from 'react';
import useProductsContext, { Product } from '@/context/products/context';
import { Timer } from '@/components/types';
import { Spinner } from '@/components/loader/spinner';
import styles from './index.module.css';
import { ButtonEvent, DivEvent } from '@/components/types/events';
import ImageZoomer from '../imageZoomer';
import { StaticImageData } from 'next/image';
import { IconContext } from 'react-icons';
import { RiZoomInLine } from 'react-icons/ri';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';


export default function ImageSlider() {
    const [images, setImages] = useState<Array<any> | null>(null);
    const [viewedImage, setViewedImage] = useState<StaticImageData | string>("");
    const [openImageZoom, setOpenImageZoom] = useState(false);
    const [openImageZoomChild, setOpenImageZoomChild] = useState(false);
    const { viewedProduct } = useProductsContext();
    const viewedImageIndex = useRef(0);
    let timer: Timer = null;

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        }
    }, [timer]);
     

    useEffect(() => {
        let timer: Timer = null;
        timer = setTimeout(() => setSliderImages(viewedProduct), 2000);

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [viewedProduct]);


    const setSliderImages = (viewedProduct: Product | null) => {
        if (!viewedProduct) {
            return
        }
        setViewedImage(viewedProduct.images.slider[0]?.src);
        setImages(viewedProduct.images.slider);
    }

    const handleImageZoom = (e:DivEvent | ButtonEvent) => {
        e.stopPropagation();
        setOpenImageZoom(true);
        
        timer = setTimeout(() => {
            setOpenImageZoomChild(true);
        });
    }

    const handleCloseZoomer = () => {
        setOpenImageZoomChild(false);

        timer = setTimeout(() => {
            setOpenImageZoom(false);
        }, 800);
    }

    const isFirstImage = () => {
        return viewedImageIndex.current === 0 ? true : false;
    }

    const isLastImage = () => {
        if (!images) {
            return;
        }
        return viewedImageIndex.current === images.length - 1 ? true : false;
    }

    const handleNext = (e: ButtonEvent) => {
        e.stopPropagation();
        if (isLastImage() || !images || images.length < 1) return;
        setViewedImage(images[++viewedImageIndex.current].src);
    }

    const handlePrev = (e: ButtonEvent) => {
        e.stopPropagation();
        if (isFirstImage() || !images || images.length < 1) return;
        setViewedImage(images[--viewedImageIndex.current].src);
    }

    const handleSetViewImage = (src: StaticImageData | string) => {
        const imageIndex = getImageIndex(src);
        if (!imageIndex || imageIndex < 0) {
            return;
        }
        viewedImageIndex.current = imageIndex;
        return setViewedImage(src);
    }

    const getImageIndex = (imageSrc: StaticImageData | string) => {
        if (!images) {
            return;
        }
        return images.findIndex(({src})=> src === imageSrc);
    }

    return (
        <>
        {openImageZoom && (
            <ImageZoomer 
            images={viewedProduct?.images.hd}
            showChild={openImageZoomChild}
            handleCloseZoomer={handleCloseZoomer}
            />
        )}
        <div className={styles.containerWrapper}>
        {!images ? (
            <div className={styles.loadingContainer}>
                <Spinner/>
            </div>
        ) : (
            <div 
            className={styles.container}
            onClick={handleImageZoom}
            >
                {/* TODO... implement image slider here */}

                <SliderButtons
                handleNext={handleNext}
                handlePrev={handlePrev}
                handleZoom={handleImageZoom}
                />
            </div> 
        )}
        </div>
        </>
    )
}


interface SliderButtonsProps {
    handleNext: (e: ButtonEvent) => void
    handlePrev: (e: ButtonEvent) => void
    handleZoom: (e: ButtonEvent) => void
}

function SliderButtons({
    handleNext,
    handlePrev,
    handleZoom
}: SliderButtonsProps) {
    return (
        <div className={styles.sliderButtonsWrapper}>
            <button 
            onClick={handleZoom}
            className={styles.sliderButton}
            >
                <IconContext.Provider value={{className: styles.buttonIcon}}>
                    <RiZoomInLine/>
                </IconContext.Provider>
            </button>
            <button 
            onClick={handlePrev}
            className={styles.sliderButton}
            >
                <IconContext.Provider value={{className: styles.buttonIcon}}>
                    <MdArrowBackIosNew/>
                </IconContext.Provider>
            </button>
            <button
            onClick={handleNext} 
            className={styles.sliderButton}
            >
                <IconContext.Provider value={{className: styles.buttonIcon}}>
                    <MdArrowForwardIos/>
                </IconContext.Provider>
            </button>
        </div>
    )
}