import * as React from 'react';
import { ScrollView, Text, View, type ViewStyle } from 'react-native';
import {
  YoooProvider,
  Button,
  Checkbox,
  RadioGroup,
  Radio,
  Input,
  TextArea,
  Label,
  Separator,
  Switch,
  Badge,
  Avatar,
  Card,
  Spinner,
  Skeleton,
  Progress,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from 'yooo-native';

const section: ViewStyle = {
  marginBottom: 32,
  paddingHorizontal: 20,
};

const sectionTitle = {
  fontSize: 18 as number,
  fontWeight: '700' as const,
  marginBottom: 12,
  color: '#232020',
};

const row: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 12,
  flexWrap: 'wrap',
};

export const ComponentsDemo: React.FC = () => {
  const [checkboxVal, setCheckboxVal] = React.useState(false);
  const [radioVal, setRadioVal] = React.useState('option1');
  const [switchVal, setSwitchVal] = React.useState(true);
  const [progressVal, setProgressVal] = React.useState(45);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <YoooProvider>
      <ScrollView
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            paddingHorizontal: 20,
            marginBottom: 24,
          }}
        >
          Components
        </Text>

        {/* ── Button ────────────────────────────────────── */}
        <View style={section}>
          <Text style={sectionTitle}>Button</Text>
          <View style={[row, { gap: 8 }]}>
            <Button onPress={() => {}}>Primary</Button>
            <Button variant="secondary" onPress={() => {}}>
              Secondary
            </Button>
            <Button variant="destructive" onPress={() => {}}>
              Destructive
            </Button>
            <Button variant="ghost" onPress={() => {}}>
              Ghost
            </Button>
          </View>
          <View style={[row, { marginTop: 8 }]}>
            <Button size="small" onPress={() => {}}>
              Small
            </Button>
            <Button size="large" onPress={() => {}}>
              Large
            </Button>
            <Button loading onPress={() => {}}>
              Loading
            </Button>
            <Button disabled onPress={() => {}}>
              Disabled
            </Button>
          </View>
        </View>

        <Separator />

        {/* ── Checkbox ──────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Checkbox</Text>
          <View style={row}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Checkbox value={checkboxVal} onValueChange={setCheckboxVal} />
              <Label>{checkboxVal ? 'Checked' : 'Unchecked'}</Label>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Checkbox size="small" defaultValue />
              <Label muted>Small</Label>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Checkbox size="large" defaultValue />
              <Label>Large</Label>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Checkbox disabled defaultValue />
              <Label muted>Disabled</Label>
            </View>
          </View>
        </View>

        <Separator />

        {/* ── Radio ─────────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Radio Group</Text>
          <RadioGroup value={radioVal} onValueChange={setRadioVal}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Radio value="option1" />
              <Label>Option 1</Label>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Radio value="option2" />
              <Label>Option 2</Label>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Radio value="option3" disabled />
              <Label muted>Disabled</Label>
            </View>
          </RadioGroup>
          <Text style={{ marginTop: 8, color: '#666', fontSize: 13 }}>
            Selected: {radioVal}
          </Text>
        </View>

        <Separator />

        {/* ── Switch ────────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Switch</Text>
          <View style={row}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Switch value={switchVal} onValueChange={setSwitchVal} />
              <Label>{switchVal ? 'On' : 'Off'}</Label>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Switch size="small" defaultValue />
              <Label muted>Small</Label>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
            >
              <Switch disabled />
              <Label muted>Disabled</Label>
            </View>
          </View>
        </View>

        <Separator />

        {/* ── Input & TextArea ──────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Input & TextArea</Text>
          <View style={{ gap: 10 }}>
            <Label>Email</Label>
            <Input placeholder="you@example.com" keyboardType="email-address" />
            <Label>Password</Label>
            <Input placeholder="Enter password" secureTextEntry />
            <Label>Error state</Label>
            <Input placeholder="Invalid input" error />
            <Label>Message</Label>
            <TextArea placeholder="Write something..." rows={3} />
          </View>
        </View>

        <Separator />

        {/* ── Badge ─────────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Badge</Text>
          <View style={row}>
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </View>
          <View style={[row, { marginTop: 8 }]}>
            <Badge size="small">Small</Badge>
            <Badge size="large">Large</Badge>
          </View>
        </View>

        <Separator />

        {/* ── Avatar ────────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Avatar</Text>
          <View style={row}>
            <Avatar name="Tachera Sasi" size="small" />
            <Avatar name="Yooo Native" />
            <Avatar name="UI" size="large" backgroundColor="#FF9500" />
            <Avatar name="XL" size="xlarge" backgroundColor="#34C759" />
          </View>
        </View>

        <Separator />

        {/* ── Card ──────────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Card</Text>
          <View style={{ gap: 12 }}>
            <Card>
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>
                Elevated Card
              </Text>
              <Text style={{ color: '#666' }}>Default variant with shadow</Text>
            </Card>
            <Card variant="outlined">
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>
                Outlined Card
              </Text>
              <Text style={{ color: '#666' }}>With border, no shadow</Text>
            </Card>
            <Card variant="filled">
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>
                Filled Card
              </Text>
              <Text style={{ color: '#666' }}>Subtle background fill</Text>
            </Card>
          </View>
        </View>

        <Separator />

        {/* ── Spinner ───────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Spinner</Text>
          <View style={row}>
            <Spinner size="small" />
            <Spinner />
            <Spinner size="large" />
            <Spinner size="large" color="#FF3B30" />
          </View>
        </View>

        <Separator />

        {/* ── Skeleton ──────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Skeleton</Text>
          <View style={{ gap: 10 }}>
            <View
              style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}
            >
              <Skeleton variant="circular" height={48} />
              <View style={{ flex: 1, gap: 6 }}>
                <Skeleton variant="text" height={16} width="60%" />
                <Skeleton variant="text" height={14} width="40%" />
              </View>
            </View>
            <Skeleton height={120} borderRadius={12} />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Skeleton height={32} width={80} borderRadius={16} />
              <Skeleton height={32} width={100} borderRadius={16} />
              <Skeleton height={32} width={60} borderRadius={16} />
            </View>
          </View>
        </View>

        <Separator />

        {/* ── Progress ──────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Progress</Text>
          <View style={{ gap: 14 }}>
            <Progress value={progressVal} showLabel />
            <Progress value={75} size="small" color="#34C759" />
            <Progress value={90} size="large" color="#FF3B30" />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button
                size="small"
                variant="secondary"
                onPress={() => setProgressVal((v) => Math.max(0, v - 10))}
              >
                -10
              </Button>
              <Button
                size="small"
                variant="secondary"
                onPress={() => setProgressVal((v) => Math.min(100, v + 10))}
              >
                +10
              </Button>
            </View>
          </View>
        </View>

        <Separator />

        {/* ── Tabs ──────────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Tabs</Text>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <Text style={{ fontWeight: '600', marginBottom: 4 }}>
                  Account
                </Text>
                <Text style={{ color: '#666' }}>
                  Manage your account settings and preferences.
                </Text>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <Text style={{ fontWeight: '600', marginBottom: 4 }}>
                  Password
                </Text>
                <Text style={{ color: '#666' }}>
                  Change your password and security settings.
                </Text>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card>
                <Text style={{ fontWeight: '600', marginBottom: 4 }}>
                  Settings
                </Text>
                <Text style={{ color: '#666' }}>
                  Configure your application preferences.
                </Text>
              </Card>
            </TabsContent>
          </Tabs>
        </View>

        <Separator />

        {/* ── Accordion ─────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Accordion</Text>
          <Accordion>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                <Text style={{ color: '#666', lineHeight: 20 }}>
                  Yes. It adheres to accessibility standards with proper ARIA
                  roles and keyboard navigation support.
                </Text>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                <Text style={{ color: '#666', lineHeight: 20 }}>
                  Yes. The chevron rotates smoothly and content uses
                  LayoutAnimation for expand/collapse transitions.
                </Text>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
              <AccordionContent>
                <Text style={{ color: '#666', lineHeight: 20 }}>
                  Yes. Set the `multiple` prop on the Accordion component to
                  allow multiple items to be expanded at once.
                </Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </View>

        <Separator />

        {/* ── Dialog ────────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Dialog</Text>
          <Button onPress={() => setDialogOpen(true)}>Open Dialog</Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you are
                  done.
                </DialogDescription>
              </DialogHeader>
              <View style={{ gap: 10, marginTop: 8 }}>
                <Label>Name</Label>
                <Input placeholder="Your name" />
                <Label>Username</Label>
                <Input placeholder="@username" />
              </View>
              <DialogFooter>
                <Button
                  variant="secondary"
                  onPress={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onPress={() => setDialogOpen(false)}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </View>

        <Separator />

        {/* ── Separator ─────────────────────────────────── */}
        <View style={[section, { marginTop: 20 }]}>
          <Text style={sectionTitle}>Separator</Text>
          <View style={{ gap: 12 }}>
            <Text style={{ color: '#666' }}>Horizontal (default)</Text>
            <Separator />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                height: 40,
              }}
            >
              <Text style={{ color: '#666' }}>Left</Text>
              <Separator orientation="vertical" />
              <Text style={{ color: '#666' }}>Center</Text>
              <Separator orientation="vertical" />
              <Text style={{ color: '#666' }}>Right</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </YoooProvider>
  );
};
