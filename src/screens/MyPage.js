import React, {useContext, useState} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {Button, Image, Input} from '../components';
import {logout, getCurrentUser, updateUserPhoto} from '../utils/firebase';
import {UserContext, ProgressContext} from '../contexts';
import {Alert} from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const MyPage = () => {

    const {dispatch} = useContext(UserContext);
    const {spinner} = useContext(ProgressContext);
    const theme = useContext(ThemeContext);
    const user = getCurrentUser();
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const _handleLogoutButtonPress = async () => {
        try {
            spinner.start();
            await logout();
        } catch (err) {
            Alert.alert('[Profile] Logout: ', err.message);
        } finally {
            dispatch({});
            spinner.stop();
        }
    };

    const _handlePhotoChange = async url => {
        try {
            spinner.start();
            const updatedUser = await updateUserPhoto(url);
            setPhotoUrl(updatedUser.photoUrl)
        } catch (err) {
            Alert.alert('Photo Error: ', err.message);
        } finally {
            spinner.stop();
        }
    }

    return (
        <Container>
            <Image
                url={photoUrl}
                onChangeImage={_handlePhotoChange}
                showButton={true}
                rounded={true}
            />
            <Input label="Name" value={user.name} disabled={true}/>
            <Input label="Email" value={user.email} disabled={true}/>
            <Button
                title="logout"
                onPress={_handleLogoutButtonPress}
                containerStyle={{marginTop: 30, backgroundColor: theme.buttonLogout}}
            />
        </Container>
    );
};

export default MyPage;