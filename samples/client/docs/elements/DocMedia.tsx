import * as React from "@barlus/react"

import { DocExample, DocPage, DocSample, DocSection, DocText, DocTitle } from "../../comps/DocPage";
import {
    Image, Figure, FigureCaption, VideoContainer
} from "@barlus/spectre";

export class DocMedia extends DocPage {
    static title = 'Media';
    static ready = true;

    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text={`Media includes responsive images, figures and video classes. `}/>
            <DocTitle>Images</DocTitle>
            <DocText text={`
                Add the ~responsive~ attribute to ~Image~ component.
                The images will scale with the parent sizes.
            `}/>
            <DocSample>
                <Image responsive src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg"
                       alt="macOS El Capitan Wallpaper"/>
            </DocSample>
            <DocText text={`
                Add the ~contain~ or ~cover~ attribute
                to~Image~ or ~Video~ components. The media will crop itself to fit inside the element (and you don't need another
                container). This feature can replace the background image trick..
            `}/>
            <DocSample columns={2}>
                <Figure>
                    <Image contain src="https://picturepan2.github.io/spectre/img/osx-yosemite.jpg"
                           style={{ background: '#f8f9fa', height: '10rem', width: '100%' }}/>
                    <FigureCaption className="text-center">contain</FigureCaption>
                </Figure>
                <Figure>
                    <Image cover src="https://picturepan2.github.io/spectre/img/osx-yosemite-2.jpg"
                           style={{ background: '#f8f9fa', height: '10rem', width: '100%' }}/>
                    <FigureCaption className="text-center">cover</FigureCaption>

                </Figure>
            </DocSample>
            <DocExample content={`
                 <Image responsive src="..." alt="..."/>
                 <Image contain src="..." alt="..."/>
                 <Image cover src="..." alt="..."/>
            `}/>
            <DocText text={`
               You can use the element ~Figure~ component for an image with a caption.
               The images with the ~responsive~ attribute will be responsive. And the included component ~FigureCaption~ will provide basic style for caption.
               Also, you can use text-left, text-center and text-right for caption alignment.
            `}/>
            <DocSample>
                <Figure>
                    <Image responsive src="https://picturepan2.github.io/spectre/img/osx-yosemite-2.jpg"/>
                    <FigureCaption className="text-center">macOS Yosemite wallpaper</FigureCaption>
                </Figure>
            </DocSample>
            <DocExample content={`
                <Figure>
                    <Image responsive src="img/osx-yosemite-2.jpg"/>
                    <FigureCaption className="text-center">macOS Yosemite wallpaper</FigureCaption>
                </Figure>
            `}/>
            <DocTitle>Video</DocTitle>
            <DocText text={`
               For responsive video, use the ~VideoContainer~ component. Insert any YouTube, Youku or other iframe/embed video inside the ~VideoContainer~. The ratio is 16:9 by default. You may add set value of  ~responsive~ attribute as 4:3 or  1:1 for customizing ratio .
            `}/>
            <DocSample>
                <VideoContainer responsive="4:3">
                    <iframe src="https://www.youtube.com/embed/5jlI4uzZGjU" allowFullScreen={true}></iframe>
                </VideoContainer>
            </DocSample>

            <DocText text={`
                You can user ~Video~ component directly
            `}/>
            <DocExample content={`
               <VideoContainer responsive="4:3">
                    <iframe src="https://www.youtube.com/embed/5jlI4uzZGjU" allowFullScreen=""></iframe>
                </VideoContainer>
                <Video responsive src="...">...</Videoresponsive>
            `}/>
        </DocSection>
    }
}