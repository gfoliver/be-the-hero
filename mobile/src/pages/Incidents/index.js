import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function Incidents() {
    const navigation = useNavigation();

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);

    async function loadIncidents() {
        if (loading || allLoaded)
            return;
         
        setLoading(true);
        const response = await api
            .get('/incidents', {
                params: { page }
            })
            .catch(e => console.log(e));

        setIncidents([...incidents, ...response.data.incidents]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);

        if (page >= response.headers['x-total-pages'])
            setAllLoaded(true);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.bold}>{total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            
            <FlatList 
                data={incidents}
                style={styles.incidentsList}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                keyExtractor={incident => String(incident.id)}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>
                        
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            R$ {incident.value.toFixed(2).replace('.', ',')} reais
                        </Text>

                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.buttonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}