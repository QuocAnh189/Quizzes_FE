'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Modal from 'react-modal';

// Components
import ContentEditor from 'src/components/Creator/ContentEditor';
import CreatorNavbar from 'src/components/Creator/CreatorNavbar';
import CreatorSidebar from 'src/components/Creator/CreatorSidebar';
import QuizSettingModal from 'src/components/Creator/QuizSettingModal';
import ThemeModal from 'src/components/Creator/ThemeModal';
import DeleteQuestionDialog from 'src/components/Creator/dialog/DeleteQuestionDialog';

// Hooks
import { useAppDispatch } from 'src/app/redux/hooks';

// Redux
import { useGetQuizByIdQuery } from 'src/app/redux/services/quizApi';

// Services
import LiquidLoading from 'src/components/LiquidLoading';

export default function QuizCreator() {
    const { id }: { id: string } = useParams();
    Modal.setAppElement('body');

    const [openDeleteQuestionDialog, setOpenDeleteQuestionDialog] = useState(false);
    const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);
    const [isOpenThemeModal, setIsOpenThemeModal] = useState(false);

    const { data: quiz, isFetching } = useGetQuizByIdQuery(id);

    if (isFetching) {
        return <LiquidLoading />;
    }

    return (
        <>
            <main>
                <CreatorNavbar quiz={quiz!} setIsOpenSettingModal={setIsOpenSettingModal} setIsOpenThemeModal={setIsOpenThemeModal} />
                <CreatorSidebar />
                <ContentEditor />
            </main>

            <DeleteQuestionDialog open={openDeleteQuestionDialog} />

            <QuizSettingModal isOpenModal={isOpenSettingModal} setIsOpenModal={setIsOpenSettingModal} quiz={quiz!} />

            <ThemeModal isOpenModal={isOpenThemeModal} setIsOpenModal={setIsOpenThemeModal} />
        </>
    );
}
