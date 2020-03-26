import React from 'react';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default function Detail() {
    const navigation = useNavigation();

    const route = useRoute();

    const { incident } = route.params;

    function navigateToList() {
        navigation.goBack();
    }

    const message = `Olá ONG, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de R$${incident.value.toFixed(2).replace('.', ',')}`

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsappMessage() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity style={styles.headerButton} onPress={navigateToList}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>
                
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>

                <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    R$ {incident.value.toFixed(2).replace('.', ',')} reais
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.title}>Salve o dia!</Text>
                <Text style={styles.title}>Seja o heroi desse caso.</Text>
                <Text style={styles.description}>Entre em contato:</Text>
                <View style={styles.buttonsWrapper}>
                    <TouchableOpacity style={styles.cardButton} onPress={sendWhatsappMessage}>
                        <Text style={styles.cardButtonText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardButton} onPress={sendMail}>
                        <Text style={styles.cardButtonText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}