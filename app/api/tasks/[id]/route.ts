import { auth } from '@/app/lib/auth'
import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
    }

    const { id } = await params 

    const result = await prisma.task.deleteMany({
      where: { 
        id: parseInt(id),
        userId: session.user.id 
      }
    })
    if (result.count === 0) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Task deleted' })
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting task' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session?.user?.id) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
    }
    const body = await request.json()
    
    const updatedTask = await prisma.task.updateMany({
      where: { 
        id: parseInt(id),
        userId: session.user.id
      },
      data: body
    })
    
    return NextResponse.json(updatedTask)
  } catch (error) {
    return NextResponse.json({ message: 'Error updating task' }, { status: 500 })
  }
}