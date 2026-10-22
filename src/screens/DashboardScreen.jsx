
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const COLORS = {
  primary: '#047857',
  darkGreen: '#065F46',
  green: '#10B981',
  background: '#F4F7F8',
  white: '#FFFFFF',
  text: '#172B3A',
  muted: '#7C8B98',
  border: '#E9EFF1',
};

const stats = [
  {
    title: 'Boletos Totales',
    value: '28',
    subtitle: '12% respecto a ayer',
    iconName: 'ticket-outline',
    color: '#059669',
    background: '#E5F7EF',
  },
  {
    title: 'Ventas Totales',
    value: '₹1,240',
    subtitle: '18% respecto a ayer',
    iconName: 'wallet-outline',
    color: '#3478F6',
    background: '#E9F0FF',
  },
  {
    title: 'Próximos Sorteos',
    value: '2',
    subtitle: 'Próximo sorteo: 2:00 PM',
    iconName: 'clock-outline',
    color: '#F59E0B',
    background: '#FFF4D8',
  },
  {
    title: 'Boletos Pendientes',
    value: '5',
    subtitle: 'Requieren atención',
    iconName: 'file-document-outline',
    color: '#F04462',
    background: '#FFE9ED',
  },
];

const actions = [
  {
    title: 'Crear Boleto',
    iconName: 'ticket-outline',
    color: '#059669',
    screen: 'CreateTicket',
  },
  {
    title: 'Consultar Boleto',
    iconName: 'magnify',
    color: '#3478F6',
    screen: 'CheckTicket',
  },
  {
    title: 'Compartir Boleto',
    iconName: 'share-variant-outline',
    color: '#8054C8',
    screen: 'ShareTicket',
  },
  {
    title: 'Informes',
    iconName: 'chart-bar',
    color: '#F5A000',
    screen: 'Reports',
  },
];

const draws = [
  {
    code: 'NY',
    name: 'Sorteo del Mediodía de Nueva York',
    time: '12:30 PM',
    description: 'Venta de boletos abierta',
    status: 'Abierto',
    color: '#3284E8',
    light: '#EAF2FF',
  },
  {
    code: 'NY',
    name: 'Sorteo de la Tarde de Nueva York',
    time: '7:00 PM',
    description: 'Venta de boletos abierta',
    status: 'Abierto',
    color: '#155EEF',
    light: '#EAF2FF',
  },
  {
    code: 'FL',
    name: 'Sorteo del Mediodía de Florida',
    time: '1:00 PM',
    description: 'Venta de boletos abierta',
    status: 'Abierto',
    color: '#F5A000',
    light: '#FFF4DC',
  },
  {
    code: 'FL',
    name: 'Sorteo de la Tarde de Florida',
    time: '9:00 PM',
    description: 'Próximamente',
    status: 'Próximamente',
    color: '#F28C28',
    light: '#FFF0DF',
  },
];

function StatCard({ item }) {

  return (
    <View style={styles.statCard}>
      <View
        style={[
          styles.statIcon,
          { backgroundColor: item.background },
        ]}
      >
        <Icon name={item.iconName} size={21} color={item.color} />
      </View>

      <View style={styles.statContent}>
        <Text style={styles.statTitle}>{item.title}</Text>
        <Text style={styles.statValue}>{item.value}</Text>

        <View style={styles.statSubtitleRow}>
          {item.title.includes('Tickets') &&
          item.title === 'Total Tickets' ? (
            <Icon name="trending-up" size={12} color="#059669" />
          ) : null}

          {item.title === 'Total Sales' ? (
            <Icon name="trending-up" size={12} color="#059669" />
          ) : null}

          <Text
            style={[
              styles.statSubtitle,
              item.title === 'Pending Tickets' && {
                color: '#E54862',
              },
            ]}
          >
            {item.subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
}

function QuickAction({ item, onPress }) {

  return (
    <TouchableOpacity
      style={styles.actionItem}
      activeOpacity={0.75}
      onPress={() => onPress(item.screen)}
    >
      <View
        style={[
          styles.actionIcon,
          { backgroundColor: item.color },
        ]}
      >
        
        <Icon name={item.iconName} color="#FFFFFF" size={23} />
      </View>

      <Text style={styles.actionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
}

function DrawItem({ item, last }) {
  return (
    <View
      style={[
        styles.drawItem,
        !last && styles.drawItemBorder,
      ]}
    >
      <View
        style={[
          styles.drawCode,
          { backgroundColor: item.color },
        ]}
      >
        <Text style={styles.drawCodeText}>{item.code}</Text>
      </View>

      <View style={styles.drawDetails}>
        <Text style={styles.drawName}>{item.name}</Text>
        <Text style={styles.drawMeta}>
          {item.time} · {item.description}
        </Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor:
              item.status === 'Open' ? '#DDF7EC' : '#FFF0D0',
          },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color:
                item.status === 'Open' ? '#07845B' : '#B77900',
            },
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );
}

export default function DashboardScreen({ navigation }) {

  const handleNavigation = (screen) => {
    // Connect these actions to your actual screens.
    if (navigation?.navigate) {
      try {
        navigation.navigate(screen);
      } catch (error) {
        console.log(`Please register the ${screen} screen.`);
      }
    } else {
      console.log(`Selected: ${screen}`);
    }
  };



  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.darkGreen}
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.brandContainer}>
              <View style={styles.brandIcon}>
                 <Image
    source={require('../../assets/images/logo.jpeg')}
    style={styles.logoImage}
    resizeMode="contain"
  />
                {/* <Icon name="hand-coin-outline" size={24} color="#FFFFFF" /> */}
              </View>

              <View>
                <Text style={styles.brandName}>Estrella Brillante</Text>
                <Text style={styles.brandSubtitle}>
                 Gestión de Boletos de Lotería
                </Text>
              </View>
            </View>

            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.notificationButton}
                onPress={() => handleNavigation('Notifications')}
              >
                <Icon name="bell-outline" size={21} color="#FFFFFF" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => handleNavigation('Profile')}
              >
                <Icon name="account-outline" size={21} color={COLORS.darkGreen} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.headerDivider} />

          <View style={styles.greetingRow}>
            <View style={styles.greetingContent}>
              <Text style={styles.greeting}>Buenos días,</Text>
              <Text style={styles.agentName}>Agente 001</Text>
              <Text style={styles.greetingSubtitle}>
                 Aquí tienes el resumen de tu negocio de lotería de hoy.
              </Text>
            </View>

            <View style={styles.datePill}>
              <Icon name="calendar-month-outline" size={15} color={COLORS.primary} />
              <View>
                <Text style={styles.dateText}>22 oct. 2026</Text>
                <Text style={styles.dayText}>Jueves</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Scrollable dashboard content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Statistics */}
          <View style={styles.statsGrid}>
            {stats.map((item) => (
              <StatCard key={item.title} item={item} />
            ))}
          </View>

          {/* Quick actions */}
          <View style={styles.sectionCard}>
            <View style={styles.actionsRow}>
              {actions.map((item) => (
                <QuickAction
                  key={item.title}
                  item={item}
                  onPress={handleNavigation}
                />
              ))}
            </View>
          </View>

          {/* Draw schedule */}
          <View style={styles.scheduleCard}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                 Calendario de Sorteos de Hoy
                </Text>
                <Text style={styles.sectionSubtitle}>
                 Consulta los sorteos diarios de lotería
                </Text>
              </View>

              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => handleNavigation('DrawSchedule')}
              >
                <Text style={styles.viewAllText}>Ver Todos</Text>
                <Icon name="chevron-right" size={15} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            {draws.map((item, index) => (
              <TouchableOpacity
                key={item.name}
                activeOpacity={0.75}
                onPress={() =>
                  handleNavigation('DrawDetails')
                }
              >
                <DrawItem
                  item={item}
                  last={index === draws.length - 1}
                />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.scheduleFooter}
              onPress={() => handleNavigation('DrawSchedule')}
            >
              <Icon name="check-circle-outline" size={15} color={COLORS.primary} />
              <Text style={styles.scheduleFooterText}>
              Mantente al día con los horarios de los últimos sorteos
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom spacing */}
          <View style={{ height: 20 }} />
        </ScrollView>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.darkGreen,
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 25,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  // brandIcon: {
  //   height: 43,
  //   width: 43,
  //   borderRadius: 15,
  //   backgroundColor: '#119B70',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderWidth: 1,
  //   borderColor: 'rgba(255,255,255,0.18)',
  // },

  brandName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  brandSubtitle: {
    fontSize: 10,
    color: '#C6E8DC',
    marginTop: 3,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  notificationButton: {
    height: 38,
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  notificationDot: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FB7185',
    borderWidth: 1.5,
    borderColor: COLORS.darkGreen,
  },

  profileButton: {
    height: 37,
    width: 37,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.13)',
    marginTop: 18,
    marginBottom: 20,
  },

  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  greetingContent: {
    flex: 1,
  },

  greeting: {
    color: '#D5F1E6',
    fontSize: 13,
    fontWeight: '500',
  },

  agentName: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
    marginTop: 2,
  },

  greetingSubtitle: {
    color: '#D0E9DF',
    fontSize: 10,
    lineHeight: 16,
    marginTop: 7,
  },

  datePill: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  dateText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  dayText: {
    fontSize: 10,
    color: '#C9E7DC',
    marginTop: 3,
  },

  scrollView: {
    flex: 1,
    marginTop: -1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 15,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },

  statCard: {
    width: '48.5%',
    minHeight: 112,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#173D32',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.035,
    shadowRadius: 8,
  },

  statIcon: {
    height: 38,
    width: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statContent: {
    flex: 1,
    paddingTop: 2,
  },

  statTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#617184',
  },

  statValue: {
    fontSize: 23,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 5,
    letterSpacing: -0.6,
  },

  statSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 5,
    flexWrap: 'wrap',
  },

  statSubtitle: {
    fontSize: 9,
    color: '#7A8997',
  },

  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginTop: 15,
    paddingVertical: 17,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#173D32',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.035,
    shadowRadius: 8,
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  actionItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },

  actionIcon: {
    width: 51,
    height: 49,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },

  actionTitle: {
    fontSize: 9,
    color: '#344454',
    fontWeight: '600',
    textAlign: 'center',
  },

  scheduleCard: {
    backgroundColor: COLORS.white,
    marginTop: 15,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 17,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#173D32',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.035,
    shadowRadius: 8,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 5,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '800',
  },

  sectionSubtitle: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 4,
  },

  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },

  viewAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },

  drawItem: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 9,
  },

  drawItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EDF1F3',
  },

  drawCode: {
    width: 39,
    height: 39,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  drawCodeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  drawDetails: {
    flex: 1,
  },

  drawName: {
    fontSize: 11,
    color: '#263746',
    fontWeight: '700',
  },

  drawMeta: {
    fontSize: 9,
    color: '#8794A1',
    marginTop: 5,
  },

  statusBadge: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 20,
    minWidth: 48,
    alignItems: 'center',
  },

  statusText: {
    fontSize: 9,
    fontWeight: '700',
  },

  scheduleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: '#F1FAF6',
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderRadius: 11,
    marginTop: 8,
    marginBottom: 5,
  },

  scheduleFooterText: {
    fontSize: 10,
    color: '#477565',
    flex: 1,
  },
logoImage: {
  width: 50,
  height: 50,
  borderRadius:"50%"
},

});
